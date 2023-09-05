import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SupabaseProvider from "./supabase-provider";
import { Narbar } from "./components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Finance graph",
  description: "Track your expenses easily",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <SupabaseProvider>
        <body className={`h-full ${inter.className}`}>
          <div className="">
            <Narbar />
            <div>{children}</div>
          </div>
        </body>
      </SupabaseProvider>
    </html>
  );
}
