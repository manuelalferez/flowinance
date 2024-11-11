import { BorderBeam } from "@/components/ui/border-beam";

import { ReactNode } from "react";

export function FancyBorder({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex p-4 w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        {children}
      </span>
      <BorderBeam
        duration={12}
        delay={9}
        colorFrom="#047857"
        colorTo="#28c28b"
      />
    </div>
  );
}
