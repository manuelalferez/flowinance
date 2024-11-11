import IconCloud from "@/components/ui/icon-cloud";

const slugs = [
  "typescript",
  "nextjs",
  "prisma",
  "vercel",
  "docker",
  "git",
  "github",
  "supabase",
  "tailwindcss",
  "openai",
];

export function SphereTech() {
  return (
    <div className="relative flex size-full md:max-w-7xl items-center justify-center overflow-hidden rounded-lg border-none bg-background px-20 pb-20 pt-8 ">
      <IconCloud iconSlugs={slugs} />
    </div>
  );
}
