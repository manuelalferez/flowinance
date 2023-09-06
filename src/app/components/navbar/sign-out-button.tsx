import { useSupabase } from "@/app/supabase-provider";
import { navigationMenuTriggerStyle } from "../ui/navigation-menu";
import { useToast } from "../ui/use-toast";

export default function SignOutButton() {
  const { supabase } = useSupabase();
  const { toast } = useToast();

  const handleSignOut = async () => {
    toast({ description: "✅ You have successfully signed out." });
    try {
      await supabase.auth.signOut();
      window.location.href = "/signin";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div>
      <button className={navigationMenuTriggerStyle()} onClick={handleSignOut}>
        Sign out
      </button>
    </div>
  );
}
