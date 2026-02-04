"use client";

import { useGetUser, useLogout } from "@/hooks/useUser";
import LoginFormContent from "../login/LoginFormContent";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { Button } from "@/components/ui/button";
import { UserDropDown } from "./UserDropDown";

export default function UserButtons() {
  const { data, isLoading, isError } = useGetUser();

  if (isLoading) return null;

  if (isError || !data) {
    return (
      <div className="flex gap-4 items-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg">Login</Button>
          </DialogTrigger>
          <LoginFormContent />
        </Dialog>

        <Button size="lg" variant="outline">
          Sign Up
        </Button>
      </div>
    );
  }

  return (
    <div className="flex gap-4 items-center">
      <UserDropDown user={data} />
    </div>
  );
}
