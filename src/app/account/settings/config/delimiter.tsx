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
import { getDelimiter, updateDelimiterInSupabase } from "@/lib/utils";
import { useEffect, useState } from "react";

export function DelimiterConfig() {
  const delimiters = [
    { value: ";", label: "Semicolon" },
    { value: ",", label: "Comma" },
    { value: ":", label: "Colon" },
    { value: "|", label: "Pipe" },
    { value: "/", label: "Slash" },
    { value: "\\", label: "Backslash" },
    { value: "-", label: "Dash" },
    { value: "_", label: "Underscore" },
    { value: " ", label: "Space" },
  ];
  const [delimiter, setDelimiter] = useState<string>(delimiters[0].value);
  const { supabase } = useSupabase();
  async function handleDelimiterChange(value: string) {
    setDelimiter(value);
    await updateDelimiterInSupabase(supabase, value);
  }
  useEffect(() => {
    async function fetchData() {
      const data = await getDelimiter(supabase);
      setDelimiter(data);
    }
    fetchData();
  }, []);
  return (
    <div>
      <h3 className="text-lg font-medium">Delimiter</h3>
      <p className="text-sm text-muted-foreground mb-2">
        Set your preferred delimiter for your csv files.
      </p>
      <Select
        value={delimiter}
        onValueChange={(value) => handleDelimiterChange(value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a delimiter" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {delimiters.map((delimiter, index) => (
              <SelectItem value={delimiter.value} key={index}>
                {delimiter.label} ({delimiter.value})
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
