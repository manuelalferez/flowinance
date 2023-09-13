"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { useSupabase } from "@/app/supabase-provider";
import { getCurrency, updateCurrencyInSupabase } from "@/lib/utils";
import { useEffect, useState } from "react";

export function CurrencyConfig() {
  const { supabase } = useSupabase();
  const [currency, setCurrency] = useState<string>("eur");
  async function handleCurrencyChange(value: string) {
    setCurrency(value);
    await updateCurrencyInSupabase(supabase, value);
  }
  useEffect(() => {
    async function fetchData() {
      const data = await getCurrency(supabase);
      setCurrency(data);
    }
    fetchData();
  }, []);
  return (
    <div>
      <h3 className="text-lg font-medium">Currency</h3>
      <p className="text-sm text-muted-foreground mb-2">
        Set your preferred currency.
      </p>
      <Select
        value={currency}
        onValueChange={(value) => handleCurrencyChange(value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a currency" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="eur">EUR</SelectItem>
            <SelectItem value="usd">USD</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
