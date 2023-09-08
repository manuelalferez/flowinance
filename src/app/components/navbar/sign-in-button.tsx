import { redirect, useRouter } from "next/navigation";
import { Button } from "../ui/button";
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
      <Button onClick={handleSignOut}>Sign in</Button>
    </div>
  );
}
