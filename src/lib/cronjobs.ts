import cron from "node-cron";
import { getWeeklyStatOfUser, sendTelegramMessage } from "./utils";
import { time, timeStamp } from "console";
import { SupabaseClient } from "@supabase/auth-helpers-nextjs";

const cronJobs: { id: number; job: cron.ScheduledTask;}[] = [];

export async function createJob(supabase:  SupabaseClient<any, "public", any>,chatId: number,email:string, cronTime: string="0 0 * * 1") {
    const job = cron.schedule(cronTime, async () => {
      const stats = await getWeeklyStatOfUser(supabase,email);
      if(stats)
      {
      var msg = '📊 Weekly Report from Flowinance\n';
      msg+=`Current Balance: ${stats?.balance}\n`
      +`Expenses: ${stats?.expenses}\n`
      +`Incomes: ${stats?.incomes}\n`
      +`Savings: ${stats?.savings}\n\n`
      +"🧾 Transactions this week:\n"
      stats?.transactions.forEach((entry)=>{
        msg+=`${entry.amount} - ${entry.concept} (${entry.category})\n`;
      })
    }
      await sendTelegramMessage(chatId,msg);
    });
    cronJobs.push({id:chatId,job:job});

    const stats = await getWeeklyStatOfUser(supabase,email);
      if(stats)
      {
      var msg = '📊 Weekly Report from Flowinance\n';
      msg+=`Current Balance: ${stats?.balance}\n`
      +`Expenses: ${stats?.expenses}\n`
      +`Incomes: ${stats?.incomes}\n`
      +`Savings: ${stats?.savings}\n\n`
      +"🧾 Transactions this week:\n"
      stats?.transactions.forEach((entry)=>{
        msg+=`${entry.amount} - ${entry.concept} (${entry.category})\n`;
      })
    }
      await sendTelegramMessage(chatId,msg);
      await sendTelegramMessage(chatId,"Now You will get Weekly stats every Monday");
    return job;
  }
export function deleteJob(chatId:number)
{
    const jobIndex = cronJobs.findIndex((job)=>job.id === chatId);
    if(jobIndex >-1)
    {
        cronJobs[jobIndex].job.stop();
        cronJobs.splice(jobIndex, 1);
    }
}
  