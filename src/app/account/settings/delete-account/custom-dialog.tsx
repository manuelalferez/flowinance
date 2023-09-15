"use client";

import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { useSupabase } from "@/app/supabase-provider";
import { deleteAccountFromSupabase } from "@/lib/utils";
import { useState } from "react";

export function CustomDialog({ children }: { children: React.ReactNode }) {
  const { supabase } = useSupabase();
  const [open, setOpen] = useState(false);
  const [isValid, setIsValid] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setIsValid(e.target.value === "delete-account");
  }

  async function handleDelete() {
    try {
      await deleteAccountFromSupabase(supabase);
      await supabase.auth.signOut();
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing out:", error);
    }
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}
      <div className="mt-2">
        <Button variant={"destructive"} onClick={() => setOpen(true)}>
          Delete account
        </Button>
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action is irreversible and will permanently delete your
            account. To confirm, please enter{" "}
            <code className="bg-gray-200 p-1 rounded-md text-red-700 text-xs">
              delete-account
            </code>
            .
            <Input className="mt-4" onChange={(e) => handleChange(e)} />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-center">
          <Button
            variant={"destructive"}
            disabled={!isValid}
            onClick={handleDelete}
          >
            I want to delete my account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
