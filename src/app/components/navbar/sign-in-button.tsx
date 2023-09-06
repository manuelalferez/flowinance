import { redirect, useRouter } from "next/navigation";
import { navigationMenuTriggerStyle } from "../ui/navigation-menu";
import { useToast } from "../ui/use-toast";

export function SignInButton() {
  const router = useRouter();
  const { toast } = useToast();

  const handleSignOut = async () => {
    toast({ description: "✅ You have successfully logged in." });
    router.push("/signin");
  };

  return (
    <div>
      <button className={navigationMenuTriggerStyle()} onClick={handleSignOut}>
        Sign in
      </button>
    </div>
  );
}
