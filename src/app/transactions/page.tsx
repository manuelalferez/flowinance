"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { Narbar } from "../components/navbar";
import { Button } from "../components/ui/button";
import { getSession } from "../supabase-server";

export default async function Page() {
  const session = await getSession();

  if (!session || !session.user.email) {
    return redirect("/signin");
  }
  return (
    <>
      <main className="flex min-h-screen flex-col items-center p-24">
        <h1 className="text-xl pb-10">Welcome to the transactions page</h1>
        <Button asChild>
          <Link href="/transactions/upload">Upload</Link>
        </Button>
      </main>
    </>
  );
}
