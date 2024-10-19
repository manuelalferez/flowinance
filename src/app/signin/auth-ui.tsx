"use client";

import { getURL } from "@/lib/utils";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { useSupabase } from "../supabase-provider";
import { Card } from "../components/ui/card";
import React from "react";

export default function AuthUI() {
  const { supabase } = useSupabase();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const seePassword = () => {
    const ele = document.querySelector(
      'input[type="password"]'
    ) as HTMLInputElement;

    if (ele) {
      ele.type = "text";
    } else {
      const ele = document.querySelector(
        'input[type="text"]'
      ) as HTMLInputElement;

      if (ele) {
        ele.type = "password";
      }
    }
  };

  if (loading) return <Loading />;

  return (
    <Card className="flex flex-col space-y-2 w-80 md:w-96 h-full md:px-8 px-6 py-6">
      <button type="button" onClick={() => seePassword()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-eye"
          viewBox="0 0 16 16"
        >
          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
        </svg>
      </button>
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
      <div className="text-sm flex flex-col text-muted-foreground"></div>
    </Card>
  );
}
