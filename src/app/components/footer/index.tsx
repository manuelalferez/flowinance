import { cn } from "@/lib/utils";
import * as React from "react";

export function Footer({ className }: React.HTMLAttributes<HTMLElement>) {
  const year = new Date().getFullYear();
  return (
    <footer className={cn(className) + "border-none mt-32 px-2"}>
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="font-logo italic font-extrabold text-emerald-700 text-xl ">
            flowinance
          </span>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a
                href="/report-bug"
                target="_blank"
                className="hover:underline me-4 md:me-6"
              >
                Report Bug
              </a>
            </li>
            <li>
              <a
                href="https://x.com/manuelalferez"
                target="_blank"
                className="hover:underline"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © {year}{" "}
          <a href="https://flowinance.com/" className="hover:underline">
            Flowinance™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
