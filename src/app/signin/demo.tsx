"use client";

import { useSupabase } from "../supabase-provider";
import { Button, buttonVariants } from "../components/ui/button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useToast } from "../components/ui/use-toast";

export default function DemoButton() {
  const { supabase } = useSupabase();
  const router = useRouter();
  const { toast } = useToast();

  async function signInWithDemoCredentials() {
    const data = await supabase.auth.signInWithPassword({
      email: process.env.NEXT_PUBLIC_DEMO_EMAIL!,
      password: process.env.NEXT_PUBLIC_DEMO_PASSWORD!,
    });

    if (!data) {
      toast({
        description:
          "🏗️ The demo account is currently under maintenance. Please, try again later.",
      });
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <Button
      className={cn(
        buttonVariants({ size: "lg" }),
        "transition-transform duration-300 ease-in-out hover:text-white hover:shadow-lg transform hover:scale-105 bg-emerald-700 hover:bg-emerald-600"
      )}
      onClick={signInWithDemoCredentials}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        viewBox="0 0 24 24"
        className="mr-2"
      >
        <path
          fill="currentColor"
          d="M5 21q-1.275 0-1.812-1.137t.262-2.113L9 11V5H8q-.425 0-.712-.288T7 4t.288-.712T8 3h8q.425 0 .713.288T17 4t-.288.713T16 5h-1v6l5.55 6.75q.8.975.263 2.113T19 21zm2-3h10l-3.4-4h-3.2zm-2 1h14l-6-7.3V5h-2v6.7zm7-7"
        />
      </svg>
      Try Demo
    </Button>
  );
}
