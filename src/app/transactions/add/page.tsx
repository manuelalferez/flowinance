import { getSession } from "@/app/supabase-server";
import AddTransactionForm from "./add-transaction-form";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession();
  if (!session || !session.user.email) {
    return redirect("/signin");
  }
  return (
    <div className="flex justify-center">
      <main className="min-h-screen flex flex-col p-2 md:p-24 w-3/4 lg:w-auto">
        <div className="p-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Add a Transaction</h1>
          <p className="text-gray-600">
            Please fill in the required fields below and click Upload when you
            are ready to proceed
          </p>
        </div>

        <AddTransactionForm />
      </main>
    </div>
  );
}
