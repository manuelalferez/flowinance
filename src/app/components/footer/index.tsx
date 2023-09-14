import { cn } from "@/lib/utils";
import * as React from "react";

export function Footer({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between  w-screen gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center  gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{" "}
            <a
              href="https://manuelalferez.com/"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Manuel Alférez
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
