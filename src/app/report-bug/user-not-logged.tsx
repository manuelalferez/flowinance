import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { buttonVariants } from "../components/ui/button";
import { cn } from "@/lib/utils";

export function UserNotLoggedBanner() {
  return (
    <div className="mt-44 flex flex-col items-center justify-center ">
      <Alert className="mb-10 text-4xl flex gap-4 items-center w-2/3">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            className="mr-4"
          >
            <g
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            >
              <path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V12m0-6.5v-2a1.5 1.5 0 1 1 3 0V12m0-6.5a1.5 1.5 0 0 1 3 0V12" />
              <path d="M17 7.5a1.5 1.5 0 0 1 3 0V16a6 6 0 0 1-6 6h-2h.208a6 6 0 0 1-5.012-2.7A69.74 69.74 0 0 1 7 19c-.312-.479-1.407-2.388-3.286-5.728a1.5 1.5 0 0 1 .536-2.022a1.867 1.867 0 0 1 2.28.28L8 13" />
            </g>
          </svg>
        </span>

        <div>
          <AlertTitle>You are not logged in</AlertTitle>
          <AlertDescription className="text-lg">
            You can provide feedback only when you&apos;re logged in. This
            feature is exclusively available to users who are logged in and
            actively using the platform.
          </AlertDescription>
        </div>
      </Alert>
      <div className="space-x-4">
        <Link href="/signin" className={cn(buttonVariants({ size: "lg" }))}>
          Get started
        </Link>
      </div>
    </div>
  );
}
