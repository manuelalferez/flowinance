import { getSession } from "@/app/supabase-server";
import Upload from "./upload";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession();
  if (!session || !session.user.email) {
    return redirect("/signin");
  }
  return (
    <main className="flex min-h-screen flex-col items-center p-2 md:p-24">
      <Upload />
    </main>
  );
}
