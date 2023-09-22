import "./globals.css";
import type { Metadata } from "next";
import SupabaseProvider from "./supabase-provider";
import { Narbar } from "./components/navbar";
import { getSession, getSupabase } from "./supabase-server";
import { Toaster } from "./components/ui/toaster";
import { userHasBeenDeleted } from "@/lib/utils";
import AccountDeleted from "./account/deleted/page";
import { Footer } from "./components/footer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Flowinance",
  description: "Track your finances, focus on what is important",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const supabase = await getSupabase();
  if (supabase) {
    const userDeleted = await userHasBeenDeleted(supabase);
    if (userDeleted) {
      await supabase.auth.signOut();
      return (
        <html lang="en">
          <head>
            <link rel="manifest" href="/site.webmanifest" />
          </head>
          <SupabaseProvider>
            <body>
              <div>
                <Narbar session={session} />
                <AccountDeleted />
                <Toaster />
              </div>
              <Footer />
            </body>
          </SupabaseProvider>
        </html>
      );
    }
  }

  return (
    <html lang="en">
      <SupabaseProvider>
        <body className="overflow-x-hidden">
          <div>
            <Narbar session={session} />
            <div>{children}</div>
            <Toaster />
          </div>
          <Footer className="w-screen border-t-2" />
        </body>
      </SupabaseProvider>
    </html>
  );
}
