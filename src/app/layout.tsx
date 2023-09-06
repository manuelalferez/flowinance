import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SupabaseProvider, { useSupabase } from "./supabase-provider";
import { Narbar } from "./components/navbar";
import { getSession } from "./supabase-server";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en" className="h-full">
      <SupabaseProvider>
        <body className={`h-full ${inter.className}`}>
          <div className="">
            <Narbar session={session}/>
            <div>{children}</div>
          </div>
        </body>
      </SupabaseProvider>
    </html>
  );
}
