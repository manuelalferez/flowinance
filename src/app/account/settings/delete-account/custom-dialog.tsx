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
import { useState } from "react";

export function CustomDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [isValid, setIsValid] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setIsValid(e.target.value === "delete-account");
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}
      <DialogTrigger>
        <Button variant={"destructive"}>Delete account</Button>
      </DialogTrigger>
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
            onClick={() => setOpen(false)}
          >
            I want to delete my account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
