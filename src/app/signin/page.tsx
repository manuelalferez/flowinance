import { redirect } from "next/navigation";
import { getSession } from "../supabase-server";
import AuthUI from "./auth-ui";

export const dynamic = "force-dynamic";

export default async function SignIn() {
  const session = await getSession();

  if (session) {
    if (session.user.email) {
      redirect("/dashboard");
    }
  }
  return (
    <div className="min-h-screen flex justify-center mt-24 p-2">
      <AuthUI />
    </div>
  );
}
