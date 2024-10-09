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
    <div className="min-h-screen flex flex-col items-center mt-16 md:mt-24 p-2">
      <h1 className="text-4xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          className="fill-current text-gray-800 dark:text-gray-200"
        >
          <path
            d="M13 21q-.425 0-.713-.288T12 20q0-.425.288-.713T13 19h6V5h-6q-.425 0-.713-.288T12 4q0-.425.288-.713T13 3h6q.825 0 1.413.588T21 5v14q0 .825-.588 1.413T19 21h-6Zm-1.825-8H4q-.425 0-.713-.288T3 12q0-.425.288-.713T4 11h7.175L9.3 9.125q-.275-.275-.275-.675t.275-.7q.275-.3.7-.313t.725.288L14.3 11.3q.3.3.3.7t-.3.7l-3.575 3.575q-.3.3-.712.288T9.3 16.25q-.275-.3-.263-.713t.288-.687l1.85-1.85Z"
          />
        </svg>
        Login
      </h1>
      <AuthUI />
    </div>
  );
}
