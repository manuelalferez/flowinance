import Link from "next/link";
import { redirect } from "next/navigation";
import { Narbar } from "./components/navbar";
import { getSession } from "./supabase-server";

export default async function Home() {
  const session = await getSession();

  if (session) {
    if (session.user.email) {
      redirect("/");
    }
  }
  return (
    <div>
      <main className="flex min-h-screen flex-col items-center p-24">
        <h1 className="text-xl pb-10">Finance graph</h1>
        <button className="max-w-xs p-4 text-xl bg-black hover:bg-gray-800 rounded-md text-white">
          <Link href="/signin">Sign in to start</Link>
        </button>
      </main>
    </div>
  );
}
