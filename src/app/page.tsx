"use client";

import { Narbar } from "./components/navbar";

export default function Home() {
  return (
    <div>
      <Narbar />
      <main className="flex min-h-screen flex-col items-center p-24">
        <h1 className="text-xl pb-10">Finance graph</h1>
      </main>
    </div>
  );
}
