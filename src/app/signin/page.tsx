import { redirect } from "next/navigation";
import { getSession } from "../supabase-server";
import AuthUI from "./auth-ui";

export const dynamic = "force-dynamic";

export default async function SignIn() {
  const session = await getSession();

  if (session) {
    if (session.user.email) {
      redirect("/transactions/upload");
    }
  }
  return (
    <div className="flex justify-center items-center mt-24 p-2">
      <AuthUI />
    </div>
  );
}
