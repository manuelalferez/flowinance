import { cn } from "@/lib/utils";
import * as React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

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
        <Button variant="ghost">
          <Link href="/report-bug" className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="mr-1"
            >
              <path
                fill="currentColor"
                d="M12 21q-1.625 0-3.013-.8T6.8 18H4.975q-.425 0-.7-.288T4 17q0-.425.288-.713T5 16h1.1q-.075-.5-.088-1T6 14H4.975q-.425 0-.7-.288T4 13q0-.425.288-.713T5 12h1q0-.5.013-1t.087-1H4.975q-.425 0-.7-.288T4 9q0-.425.288-.713T5 8h1.8q.35-.575.788-1.075T8.6 6.05l-.925-.95q-.275-.3-.263-.713T7.7 3.7q.275-.275.7-.275t.7.275l1.45 1.45q.7-.225 1.425-.225t1.425.225l1.5-1.475q.3-.275.713-.262t.687.287q.275.275.275.7t-.275.7l-.95.95q.575.375 1.038.863T17.2 8h1.825q.425 0 .7.288T20 9q0 .425-.288.713T19 10h-1.1q.075.5.088 1T18 12h1.025q.425 0 .7.288T20 13q0 .425-.288.713T19 14h-1q0 .5-.013 1t-.087 1h1.125q.425 0 .7.288T20 17q0 .425-.288.713T19 18h-1.8q-.8 1.4-2.188 2.2T12 21Zm0-2q1.65 0 2.825-1.175T16 15v-4q0-1.65-1.175-2.825T12 7q-1.65 0-2.825 1.175T8 11v4q0 1.65 1.175 2.825T12 19Zm-1-3h2.025q.425 0 .7-.288T14 15q0-.425-.288-.713T13 14h-2.025q-.425 0-.7.288T10 15q0 .425.288.713T11 16Zm0-4h2.025q.425 0 .7-.288T14 11q0-.425-.288-.713T13 10h-2.025q-.425 0-.7.288T10 11q0 .425.288.713T11 12Zm1 1Z"
              />
            </svg>
            Report Bug
          </Link>
        </Button>
      </div>
    </footer>
  );
}
