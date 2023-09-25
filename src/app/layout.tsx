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
            <link rel="icon" type="image/x-icon" href="/image/favicon.ico" />
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/image/apple-touch-icon.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/image/favicon-32x32.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/image/favicon-16x16.png"
            />
            <meta name="author" content="Manuel Alférez" />
            <meta
              name="description"
              content="Managing your money is now easier than ever. Visualize your
              budget in a quick and easy way."
            />

            <meta property="og:title" content="Flowinance" />
            <meta property="og:type" content="app" />
            <meta property="og:url" content="https://flowinance.vercel.app/" />
            <link rel="manifest" href="/site.webmanifest" />
            <link
              rel="mask-icon"
              href="/image/safari-pinned-tab.svg"
              color="#047857"
            />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="theme-color" content="#ffffff"></meta>
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
