"use client";

import { getURL } from "@/lib/utils";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { useSupabase } from "../supabase-provider";

export default function AuthUI() {
  const { supabase } = useSupabase();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="flex flex-col space-y-4 w-80">
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
                brand: "#A7F3D0",
                brandAccent: "#52525b",
              },
            },
          },
        }}
        theme="light"
      />
    </div>
  );
}