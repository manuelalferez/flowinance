import { getSession } from "@/app/supabase-server";
import UploadAi from "./upload-ai";
import { redirect } from "next/navigation";
import OpenAI from "openai";

export default async function Page() {
  const session = await getSession();
  if (!session || !session.user.email) {
    return redirect("/signin");
  }

  async function extractFieldsUsingOpenAi(
    lines: string[]
  ): Promise<string | undefined> {
    "use server";
    const text = `given the next table: ${lines} give me the result table in a string format with a column for date, concept and amount. Delete those rows that don't bellow to the column. Dont give me the code. I just want the result. I want the amount to be always positive. The date has to be in the format DD/MM/YYYY. After it, add a new column called category. Categorize each row account with the next list of categories depending of the concept. Exacly the next categories: "Home", "Groceries", "Transportation", "Subscriptions", "Trips", "Hobbies", "Health", "Bar. cafe. restaurant", "Clothes & shoes", "Internet", "Others", "Online shopping", "Donations & Gifts", "Rent", "Salary", "Refunds / Reimbursements", "Savings", "Investing" Categorize it to "Others" if the amount is negative and to "Refunds / Reimbursements" if the amount is positive.`;
    const openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPEN_AI,
      dangerouslyAllowBrowser: true,
    });

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: text }],
      model: "gpt-3.5-turbo",
    });
    if (!completion.choices[0].message.content) {
      console.log("Error getting the result from OpenAI");
      return;
    }
    return completion.choices[0].message.content!;
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-2 md:p-24">
      <UploadAi extractFieldsUsingOpenAi={extractFieldsUsingOpenAi} />
    </main>
  );
}
