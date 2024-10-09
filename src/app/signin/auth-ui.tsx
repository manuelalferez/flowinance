"use client";

import { getURL } from "@/lib/utils";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { useSupabase } from "../supabase-provider";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function AuthUI() {
  const { supabase } = useSupabase();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <Loading />;

  function setDemoEmailandPassword() {
    document
      .getElementById("email")
      ?.setAttribute("value", process.env.NEXT_PUBLIC_DEMO_EMAIL!);
    document
      .getElementById("password")
      ?.setAttribute("value", process.env.NEXT_PUBLIC_DEMO_PASSWORD!);
  }

  return (
    <Card className="flex flex-col space-y-4 w-80 md:w-96 h-full p-8">
      <Auth
        supabaseClient={supabase}
        providers={[]}
        redirectTo={`${getURL()}/auth/callback`}
        magicLink={true}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#047857",
                brandAccent: "#52525b",
              },
            },
          },
        }}
        theme="light"
      />
      <div className="text-sm flex flex-col text-muted-foreground">
        Would you like to give it a try? Feel free to use our demo account 😉
      </div>
      <Button variant={"default"} onClick={setDemoEmailandPassword}>
        Use Demo Creds
      </Button>
    </Card>
  );
}
