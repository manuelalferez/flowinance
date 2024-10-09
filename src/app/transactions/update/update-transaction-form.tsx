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
import { useSearchParams } from "next/navigation";
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

  useEffect(() => {
    async function getData() {
      const userId = await getUserId(supabase);
      if (!userId) {
        return;
      }
      try {
        const details = await getTransactionsFromId(supabase, transactionId!);
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
  }, []);

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
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Card className="p-2">
            <Table key="form-table">
              <TableHeader>
                <TableRow>
                  {TABLE_HEADERS.map((header, index) => (
                    <TableHead className="p-2 lg:pr-44 md:pr-28" key={index}>
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
          </Card>
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
    </>
  );
}
