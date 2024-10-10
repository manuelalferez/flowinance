import { getSession } from "@/app/supabase-server";
import UpdateTransactionForm from "./update-transaction-form";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession();
  if (!session || !session.user.email) {
    return redirect("/signin");
  }
  return (
    <div className="flex justify-center">
      <main className="min-h-screen flex flex-col p-24 w-3/4">
        <div className="p-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Update Transaction</h1>
          <p className="text-gray-600">
            Please fill in the required fields below and click Update when you
            are ready to proceed
          </p>
        </div>

        <UpdateTransactionForm />
      </main>
    </div>
  );
}
