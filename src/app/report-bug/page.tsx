import { redirect } from "next/navigation";
import BugForm from "./bug-form";
import { getSession } from "../supabase-server";
import { UserNotLoggedBanner } from "./user-not-logged";

export default async function Page() {
  const session = await getSession();

  return (
    <div className="min-h-screen">
      {session ? (
        <main className="flex flex-col items-center">
          <BugForm />
        </main>
      ) : (
        <main className="flex flex-col items-center">
          <UserNotLoggedBanner />
        </main>
      )}
    </div>
  );
}
