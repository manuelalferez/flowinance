import Link from "next/link";
import {
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";

export function SignInButton() {
  return (
    <Link href="/signin" passHref>
      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
        Sign in
      </NavigationMenuLink>
    </Link>
  );
}
