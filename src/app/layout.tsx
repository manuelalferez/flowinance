import "./globals.css";
import type { Metadata } from "next";
import SupabaseProvider from "./supabase-provider";
import { Navbar } from "./components/navbar";
import { getSession, getSupabase } from "./supabase-server";
import { Toaster } from "./components/ui/toaster";
import { userHasBeenDeleted } from "@/lib/utils";
import AccountDeleted from "./account/deleted/page";
import { Footer } from "./components/footer";
import { Analytics } from "@vercel/analytics/react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Flowinance",
  description:
    "Managing your money is now easier than ever. Visualize your budget in a quick and easy way.",
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
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/apple-touch-icon.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/favicon-32x32.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/favicon-16x16.png"
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
              href="/safari-pinned-tab.svg"
              color="#047857"
            />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="theme-color" content="#ffffff"></meta>
            <link
              href="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.css"
              rel="stylesheet"
            />
          </head>

          <SupabaseProvider>
            <body>
              <div>
                <Navbar session={session} />
                <AccountDeleted />
                <Toaster />
              </div>
              <Footer />
              <Analytics />
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
            <Navbar session={session} />
            <div>{children}</div>
            <Toaster />
          </div>
          <Footer className="w-screen border-t-2" />
          <Analytics />
          <script src="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js"></script>
        </body>
      </SupabaseProvider>
    </html>
  );
}
