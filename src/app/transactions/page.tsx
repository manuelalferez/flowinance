import { redirect } from "next/navigation";
import { getSession } from "../supabase-server";
import Transactions from "./transactions";

export default async function Page() {
  const session = await getSession();
  if (!session || !session.user.email) {
    return redirect("/signin");
  }
  return (
    <div>
      <main className="flex flex-col items-center p-24">
        <Transactions />
      </main>
    </div>
  );
}
