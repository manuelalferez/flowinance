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
import { currencies } from "@/lib/constants";
import {
  getCurrency,
  saveCurrencyInLocalStorage,
  updateCurrencyInSupabase,
} from "@/lib/utils";
import { useEffect, useState } from "react";

export function CurrencyConfig() {
  const { supabase } = useSupabase();
  const [currency, setCurrency] = useState<string>("EUR");
  async function handleCurrencyChange(value: string) {
    setCurrency(value);
    await updateCurrencyInSupabase(supabase, value);
    saveCurrencyInLocalStorage(value);
  }
  useEffect(() => {
    async function fetchData() {
      const data = await getCurrency(supabase);
      setCurrency(currencies.find((currency) => currency.name === data)!.name);
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
            {currencies.map((currency) => (
              <SelectItem key={currency.name} value={currency.name}>
                {currency.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
