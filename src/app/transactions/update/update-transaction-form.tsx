"use client";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { useToast } from "@/app/components/ui/use-toast";
import Loading from "@/app/loading";
import { useSupabase } from "@/app/supabase-provider";
import { ALL_CATEGORIES } from "@/lib/categories";
import { TABLE_HEADERS } from "@/lib/constants";
import {
  decryptTransactions,
  formatDateToString,
  getTransactionsFromId,
  getUserId,
  updateTransactionToSupabase,
} from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UpdateTransactionForm() {
  const { supabase } = useSupabase();
  const params = useSearchParams();
  const transactionId = params.get("id");
  const [concept, setConcept] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    async function getData() {
      const userId = await getUserId(supabase);
      if (!userId) {
        return;
      }
      if (!transactionId) {
        setLoading(false);
        return;
      }

      try {
        const details = await getTransactionsFromId(supabase, transactionId);
        if (!details) {
          toast({
            description:
              "❎ Error fetching transactions. Please, try again later.",
          });
        } else {
          const decryptData = decryptTransactions(details, userId);
          setCategory(decryptData[0].category);
          setAmount(decryptData[0].amount.toString());
          setConcept(decryptData[0].concept);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    getData();
  }, [supabase, transactionId, toast]);

  const date = formatDateToString(new Date());

  function handleAmountChange(value: any) {
    if (isNaN(value)) {
      toast({
        description: "ℹ️ Amount must be a positive number.",
      });
      return;
    }
    setAmount(value);
  }

  async function updateTransaction() {
    const userId = await getUserId(supabase);
    if (!userId) {
      toast({
        description: "Error updating transaction, try again later",
      });
      return;
    }
    const transaction = {
      concept,
      amount,
      category,
      date,
      user_id: userId,
    };
    await updateTransactionToSupabase(supabase, transaction, transactionId!);
    toast({
      description: "🎉 Transaction Updated",
    });
    router.push("/transactions");
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Card className="p-2">
            {!transactionId ? (
              <div className="flex flex-col items-center">
                <p className="text-red-600 p-4  bg-red-50 rounded-md">
                  ❎ Oops! We couldn&apos;t find the Transaction ID you entered.
                  It may have been removed or doesn&apos;t exist. Please head
                  over to the transactions page to explore your current
                  transactions.
                </p>

                <Button
                  className="mt-4"
                  onClick={() => (window.location.href = "/transactions")}
                >
                  Go to Transactions
                </Button>
              </div>
            ) : (
              <>
                <Table key="form-table">
                  <TableHeader>
                    <TableRow>
                      {TABLE_HEADERS.map((header, index) => (
                        <TableHead
                          className="p-2 lg:pr-44 md:pr-28"
                          key={index}
                        >
                          {header}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="p-2" key="form-date">
                        {date}
                      </TableCell>
                      <TableCell className="p-2" key="form-concept">
                        <Input
                          onChange={(e) => setConcept(e.target.value)}
                          value={concept}
                          placeholder="Concept"
                        />
                      </TableCell>
                      <TableCell className="p-2" key="form-amount">
                        <Input
                          onChange={(e) => handleAmountChange(e.target.value)}
                          value={amount}
                          placeholder="Amount"
                        />
                      </TableCell>
                      <TableCell className="p-2" key="form-category">
                        <select
                          className="w-[180px] p-2 border rounded"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          <option value="" disabled selected>
                            Select category
                          </option>
                          {ALL_CATEGORIES.map((item, index) => (
                            <option value={item} key={index}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <div className="flex justify-center mt-10">
                  <Button
                    onClick={updateTransaction}
                    className="bg-emerald-200 text-black hover:text-white"
                    disabled={!concept || !amount || !category}
                  >
                    Update transaction
                  </Button>
                </div>
              </>
            )}
          </Card>
        </>
      )}
    </>
  );
}
