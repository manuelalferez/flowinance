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
  const defaultDelimiter = delimiters[0].value;
  const [delimiter, setDelimiter] = useState<string>(defaultDelimiter);
  return (
    <div>
      <h3 className="text-lg font-medium">Delimiter</h3>
      <p className="text-sm text-muted-foreground mb-2">
        Set your preferred delimiter for your csv files.
      </p>
      <Select value={delimiter} onValueChange={setDelimiter}>
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
