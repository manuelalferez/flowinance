"use client";

import { useState } from "react";
import { Button } from "../components/ui/button";
import { useSupabase } from "../supabase-provider";
import { uploadBugToSupabase } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";

export default function BugForm() {
  const [input, setInput] = useState("");
  const [isSent, setIsSent] = useState(false);
  const { supabase } = useSupabase();
  async function handleSend() {
    await uploadBugToSupabase(supabase, input);
    setIsSent(true);
  }
  return !isSent ? (
    <div className="w-full">
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-16 lg:py-24">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl lg:text-4xl">
            Your contributions are very important to us
          </h1>

          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            What can we improve? Please, describe in as much detail the bug or
            difficulties you are encountering when using the platform. It&apos;s
            completly <b>anonymous</b>.
          </p>
          <div className="space-x-4"></div>
        </div>
      </section>
      <div className="flex flex-col justify-center items-center gap-2 w-full">
        <textarea
          className="h-56 w-5/6 md:w-1/2 rounded-md border border-input bg-background px-3 py-2 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button className="w-fit flex justify-center" onClick={handleSend}>
          Send
        </Button>
      </div>
    </div>
  ) : (
    <div className="mt-44 flex justify-center items-center gap-2">
      <Alert className="mb-10 text-4xl border-none flex items-center gap-4">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="34"
            viewBox="0 0 36 36"
          >
            <path
              fill="currentColor"
              d="M18 2a16 16 0 1 0 16 16A16 16 0 0 0 18 2Zm0 30a14 14 0 1 1 14-14a14 14 0 0 1-14 14Z"
            />
            <path
              fill="currentColor"
              d="M28 12.1a1 1 0 0 0-1.41 0l-11.1 11.05l-6-6A1 1 0 0 0 8 18.53L15.49 26L28 13.52a1 1 0 0 0 0-1.42Z"
            />
            <path fill="none" d="M0 0h36v36H0z" />
          </svg>
        </span>
        <div>
          <AlertTitle className="text-emerald-900">
            Feedback sent successfully!
          </AlertTitle>
          <AlertDescription className="text-lg">
            Thank you for your feedback; we will review it as soon as possible.
          </AlertDescription>
        </div>
      </Alert>
    </div>
  );
}
