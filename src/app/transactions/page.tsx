"use client";

import Link from "next/link";
import { Narbar } from "../components/navbar";
import { Button } from "../components/ui/button";

export default function Page() {
  return (
    <>
      <Narbar />
      <main className="flex min-h-screen flex-col items-center p-24">
        <h1 className="text-xl pb-10">Welcome to the transactions page</h1>
        <Button asChild>
          <Link href="/transactions/upload">Upload</Link>
        </Button>
      </main>
    </>
  );
}
