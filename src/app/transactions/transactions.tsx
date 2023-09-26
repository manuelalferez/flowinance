"use client";

import { AppContext } from "@/lib/context";
import { decryptTransactions, getTransactions, getUserId } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import Loading from "../loading";
import { useSupabase } from "../supabase-provider";
import { Transaction } from "../types/global";
import { TransactionsTable } from "./ui/transactions-table";
import { useToast } from "../components/ui/use-toast";
import NoTransactions from "./ui/no-transactions";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../components/ui/hover-card";

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const { supabase } = useSupabase();
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      const userId = await getUserId(supabase);
      if (!userId) {
        return;
      }
      const data = await getTransactions(supabase);

      if (!data) {
        toast({
          description:
            "❎ Error fetching transactions. Please, try again later.",
        });
      } else {
        const decryptData = decryptTransactions(data, userId);
        setTransactions(decryptData);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen mb-2 w-full md:5/6 lg:w-4/6">
      <div className="flex justify-center md:justify-start w-full">
        <h1 className="text-4xl font-semibold text-gray-800 mb-6">
          Transactions
        </h1>
      </div>
      <AppContext.Provider value={{ transactions }}>
        <div className="flex items-start mb-10 gap-2 ">
          <HoverCard>
            <HoverCardTrigger>
              <Link href="/transactions/upload-ai" legacyBehavior passHref>
                <Button className="bg-emerald-700 hover:bg-emerald-600">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      className="mr-1"
                    >
                      <path
                        fill="currentColor"
                        d="m10 19l-2.5-5.5L2 11l5.5-2.5L10 3l2.5 5.5L18 11l-5.5 2.5L10 19Zm8 2l-1.25-2.75L14 17l2.75-1.25L18 13l1.25 2.75L22 17l-2.75 1.25L18 21Z"
                      />
                    </svg>
                    <span>Smart Upload</span>
                  </div>
                </Button>
              </Link>
            </HoverCardTrigger>
            <HoverCardContent>
              Upload your files and watch the magic happen! Our Artificial
              Intelligence removes unnecessary columns, categorizes your
              transactions, and formats the data for you. Sit back and relax -
              we&apos;ve got everything covered.
            </HoverCardContent>
          </HoverCard>

          <HoverCard>
            <HoverCardTrigger>
              <Link href="/transactions/upload" legacyBehavior passHref>
                <Button className="bg-emerald-700 hover:bg-emerald-600">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      className="mr-1"
                    >
                      <path
                        fill="currentColor"
                        d="M11 14.825V18q0 .425.288.713T12 19q.425 0 .713-.288T13 18v-3.175l.9.9q.15.15.338.225t.375.063q.187-.013.362-.088t.325-.225q.275-.3.288-.7t-.288-.7l-2.6-2.6q-.15-.15-.325-.212T12 11.425q-.2 0-.375.063t-.325.212l-2.6 2.6q-.3.3-.287.7t.312.7q.3.275.7.288t.7-.288l.875-.875ZM6 22q-.825 0-1.413-.588T4 20V4q0-.825.588-1.413T6 2h7.175q.4 0 .763.15t.637.425l4.85 4.85q.275.275.425.638t.15.762V20q0 .825-.588 1.413T18 22H6Zm7-14V4H6v16h12V9h-4q-.425 0-.713-.288T13 8ZM6 4v5v-5v16V4Z"
                      />
                    </svg>
                    Upload
                  </div>
                </Button>
              </Link>
            </HoverCardTrigger>
            <HoverCardContent>
              Upload the file with your transactions. Gain flexibility when
              categorizing transactions to your preference. Remove those you
              don&apos;t want.
            </HoverCardContent>
          </HoverCard>

          <HoverCard>
            <HoverCardTrigger>
              <Link
                href="/transactions/add"
                legacyBehavior
                passHref
                className="w-full h-full"
              >
                <Button className="bg-emerald-700 hover:bg-emerald-600">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      className="mr-1"
                    >
                      <path
                        fill="currentColor"
                        d="M10 8H8v4H4v2h4v4h2v-4h4v-2h-4zm4.5-1.92V7.9l2.5-.5V18h2V5z"
                      />
                    </svg>
                    Add
                  </div>
                </Button>
              </Link>
            </HoverCardTrigger>
            <HoverCardContent>
              Add transactions one by one. It can be useful in certain
              situations.
            </HoverCardContent>
          </HoverCard>
        </div>
        {loading ? (
          <Loading />
        ) : transactions.length !== 0 ? (
          <TransactionsTable />
        ) : (
          <NoTransactions />
        )}
      </AppContext.Provider>
    </div>
  );
}
