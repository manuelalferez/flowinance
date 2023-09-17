"use client";

import { AppContext } from "@/lib/context";
import {
  decryptTransactions,
  getTransactions,
  getUserEmail,
  getUserId,
} from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import Loading from "../loading";
import { useSupabase } from "../supabase-provider";
import { Transaction } from "../types/global";
import { TransactionsTable } from "./ui/transactions-table";
import { useToast } from "../components/ui/use-toast";
import { CardDescription } from "../components/ui/card";
import NoTransactions from "./ui/no-transactions";
import { LoadingIcon } from "../components/dashboard/ui/loading-icon";

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const { supabase } = useSupabase();
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      const userId = await getUserId(supabase);
      const userEmail = await getUserEmail(supabase);
      if (!userEmail) {
        return;
      }
      if (!userId) {
        return;
      }
      setEmail(userEmail);
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
    <div className="min-h-screen mb-2 w-3/4">
      <div>
        <h1 className="text-4xl font-semibold text-gray-800 mb-2">
          Transactions
        </h1>
        <CardDescription className="mb-4">
          Logged as: {}
          {loading ? (
            <LoadingIcon />
          ) : (
            <span className="bg-emerald-100 p-1 rounded-sm">{email}</span>
          )}
        </CardDescription>
      </div>
      <AppContext.Provider value={{ transactions }}>
        <div className="flex items-start mb-10 gap-2 ">
          <Button asChild>
            <Link href="/transactions/upload-ai">Smart Upload</Link>
          </Button>
          <Button asChild>
            <Link href="/transactions/upload">Upload</Link>
          </Button>
          <Button asChild>
            <Link href="/transactions/add">Add</Link>
          </Button>
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
