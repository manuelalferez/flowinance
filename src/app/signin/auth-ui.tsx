"use client";

import { getURL } from "@/lib/utils";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { useSupabase } from "../supabase-provider";
import { Card } from "../components/ui/card";
import { seePassword } from "./SeePassword";

export default function AuthUI() {
  const { supabase } = useSupabase();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <Loading />;

  return (
    <Card className="flex flex-col space-y-2 w-80 md:w-96 h-full md:px-8 px-6 py-6">
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
        <button type="button" onClick={() => seePassword()} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">See password</button>
        Would you like to give it a try? Feel free to use our demo account 😉
        <p>
          email: <code className="text-sm ">tiffs_purview0r@icloud.com</code>
        </p>
        <p>
          password: <code className="text-sm ">qwerty</code>
        </p>
      </div>
    </Card>
  );
}
