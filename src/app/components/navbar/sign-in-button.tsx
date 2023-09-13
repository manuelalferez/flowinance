import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export function SignInButton() {
  const router = useRouter();

  const handleSignIn = async () => {
    router.push("/signin");
  };

  return (
    <div>
      <Button onClick={handleSignIn}>Sign in</Button>
    </div>
  );
}
