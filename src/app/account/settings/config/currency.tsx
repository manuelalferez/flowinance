"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { useState } from "react";

export function CurrencyConfig() {
  const [currency, setCurrency] = useState<string>("eur");
  return (
    <div>
      <h3 className="text-lg font-medium">Currency</h3>
      <p className="text-sm text-muted-foreground mb-2">
        Set your preferred currency.
      </p>
      <Select value={currency} onValueChange={setCurrency}>
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
