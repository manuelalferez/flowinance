import { NextRequest,NextResponse } from 'next/server';
import * as dotenv from "dotenv"
import { getTelegramIntegrationFromUserId, saveTelegramIntegration, sendTelegramMessage } from '@/lib/utils';
import { createClient } from '@supabase/supabase-js';
import { error } from 'console';
import { createJob, deleteJob } from '@/lib/cronjobs';
dotenv.config();

type UserState = {
  state: string;
  timestamp: number;
};
var url = process.env.NEXT_PUBLIC_SUPABASE_URL??"";
var anon = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY??"";
const supabase =  createClient(url,anon);
const userdata = supabase.auth.admin.listUsers().then(x=>x.data);

const users = userdata.then((x)=>x.users);

let userStates: Record<string, UserState> = {}; 
const STATE_EXPIRY_TIME = 60 * 60 * 24 *1000 ; 

function isStateExpired(timestamp: number) {
  return Date.now() - timestamp > STATE_EXPIRY_TIME;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    if (message) {
      const chatId = message.chat.id;
      const text:string = message.text;
      const currentState = userStates[chatId];
      if (currentState && isStateExpired(currentState.timestamp)) {
        delete userStates[chatId];
      }
      if (userStates[chatId]?.state === 'awaiting_email') {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        try{
        if (emailPattern.test(text)) {
          userStates[chatId] = { state: 'done', timestamp: Date.now() };
          const user =  (await users).find((x)=>x.email === text);
          if(user)
          {
          var oldChatId = await getTelegramIntegrationFromUserId(supabase,user.id);
          if(oldChatId)
          {
            deleteJob(Number(oldChatId));
          }
          await saveTelegramIntegration(supabase,user.id,chatId);
          await sendTelegramMessage(chatId, `Thanks for providing your email: ${text}\n You are now registered with Flowinance`);
          delete userStates[chatId];
          await createJob(supabase,chatId,text);
          }
          else{
            await sendTelegramMessage(chatId, `No Account is registered with email ${text}\n If you Don't have account visit Flowinance and create one`);
            delete userStates[chatId];
          }
        } else {
          await sendTelegramMessage(chatId, `Please provide a valid email address.`);
        }
      }
      catch(e)
      {
        console.log("error:",e);
      }
    }
      else if (text.startsWith('/start')){
        userStates[chatId] = { state: 'awaiting_email', timestamp: Date.now() };
        await sendTelegramMessage(chatId, `Welcome to Flowinance! Please provide your email to continue.`);
    }
     return NextResponse.json({ status: 'ok' });
    }
  } catch (error) {
    console.error('Error processing the request:', error);
    return NextResponse.json({ status: 'error', message: 'Invalid request' }, { status: 400 });
  }
}
setInterval(() => {
  const now = Date.now();
  for (const chatId in userStates) {
    if (isStateExpired(userStates[chatId].timestamp)) {
      delete userStates[chatId];
    }
  }
}, STATE_EXPIRY_TIME);