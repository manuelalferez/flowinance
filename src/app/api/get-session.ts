// api/get-session.js (Next.js API route)
import { getSession } from "@/app/supabase-server";
import { Session } from "@supabase/auth-helpers-nextjs";

export default async function handler(
  req: any,
  res: { json: (arg0: { session: Session | null }) => void }
) {
  const session = await getSession();
  res.json({ session });
}
