import { redirect } from "next/navigation";
import Dashboard from "../components/dashboard/dashboard";
import { getSession } from "../supabase-server";

export default async function Page() {
  const session = await getSession();
  if (!session || !session.user.email) {
    return redirect("/signin");
  }
  return (
    <div className="min-h-screen mb-2">
      <main className="flex flex-col items-center p-24">
        <Dashboard />
      </main>
    </div>
  );
}
