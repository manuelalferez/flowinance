import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SupabaseProvider from "./supabase-provider";
import { Narbar } from "./components/navbar";
import { getSession } from "./supabase-server";
import { Toaster } from "./components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Finance graph",
  description: "Track your expenses easily",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  return (
    <html lang="en">
      <SupabaseProvider>
        <body className={`overflow-x-hidden ${inter.className}`}>
          <div>
            <Narbar session={session} />
            <div>{children}</div>
          </div>
          <Toaster />
        </body>
      </SupabaseProvider>
    </html>
  );
}
