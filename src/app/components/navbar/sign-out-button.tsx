import Link from "next/link";
import {
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";

export function SignOutButton() {
  return (
    <Link href="/signout" passHref>
      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
        Sign out
      </NavigationMenuLink>
    </Link>
  );
}
