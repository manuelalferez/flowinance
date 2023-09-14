"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { SignInButton } from "./sign-in-button";
import { AccountButton } from "./account-button";

export function Narbar({ session }: any) {
  return (
    <NavigationMenu className="p-4 overflow-x-hidden">
      <NavigationMenuList className="flex justify-around w-screen">
        <div className="flex gap-1">
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          {session && (
            <NavigationMenuItem className="flex gap-1">
              <Link href="/dashboard" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Dashboard
                </NavigationMenuLink>
              </Link>
              <Link href="/transactions" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Transactions
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )}
        </div>
        <NavigationMenuItem>
          {session ? <AccountButton /> : <SignInButton />}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
