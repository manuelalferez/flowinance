import cron from "node-cron";
import { getWeeklyStatOfUser, sendTelegramMessage } from "./utils";
import { SupabaseClient } from "@supabase/auth-helpers-nextjs";

export const cronJobs: { id: number; job: cron.ScheduledTask;}[] = [];

export async function createJob(supabase:  SupabaseClient<any, "public", any>,chatId: number,email:string, cronTime: string="0 0 * * 1",saveTodb=true) {
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
      await sendTelegramMessage(chatId,msg);
    }
    });
    cronJobs.push({id:chatId,job:job});

    var userId:string="";
    const users = (await supabase.auth.admin.listUsers()).data.users;
    users.forEach((x)=>{if(x.email===email){userId=x.id;}});
    if (!userId) {
      return null;
    }
    if(saveTodb){
    const {error } = await supabase
    .from('cron_jobs')
    .insert([
      { user_id: userId, chat_id: chatId, cron_job_id: chatId }
    ]);
  }

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
      await sendTelegramMessage(chatId,msg);
    }
      await sendTelegramMessage(chatId,"Now You will get Weekly stats every Monday");
    return job;
  }
export async function deleteJob(chatId:number,supabase:  SupabaseClient<any, "public", any>)
{
    const jobIndex = cronJobs.findIndex((job)=>job.id === chatId);
    if(jobIndex >-1)
    {
        cronJobs[jobIndex].job.stop();
        cronJobs.splice(jobIndex, 1);
        const { error } = await supabase
      .from('cron_jobs')
      .delete()
      .eq('chat_id', chatId.toString());
    }
}

export async function startAllCronJobs(supabase:  SupabaseClient<any, "public", any>) {
  const { data, error } = await supabase.from("cron_jobs").select("*");

  if(data)
  {
  data.forEach(async (job) => {
    const { chat_id, user_id } = job;
    await createJob(supabase,Number(chat_id),(await supabase.auth.admin.getUserById(user_id)).data.user?.email??"","0 0 * * 1",false)
  });
}
}
