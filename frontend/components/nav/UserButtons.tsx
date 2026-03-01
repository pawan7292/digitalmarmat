"use client";

import { useGetUser } from "@/hooks/useUser";
import LoginFormContent from "../login/LoginFormContent";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { Button } from "@/components/ui/button";
import { UserDropDown } from "./UserDropDown";
import SignUpFormContent from "../signup/SignUpFormContent";

export default function UserButtons() {
  const { data, isLoading, isError } = useGetUser();

  if (isLoading) {
    return (
      <div className="flex gap-3 items-center">
        <div className="h-9 w-16 rounded-lg bg-slate-100 animate-pulse" />
        <div className="h-9 w-20 rounded-lg bg-slate-100 animate-pulse" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex gap-2.5 items-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-sm font-semibold text-slate-700 hover:text-[#165092] hover:bg-[#eff4fb] px-4"
            >
              Login
            </Button>
          </DialogTrigger>
          <LoginFormContent />
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="sm"
              className="text-sm font-semibold bg-[#1d58a9] hover:bg-[#165092] text-white px-4 rounded-lg shadow-sm shadow-[#b9d1ef] transition-colors"
            >
              Sign Up
            </Button>
          </DialogTrigger>
          <SignUpFormContent />
        </Dialog>
      </div>
    );
  }

  return (
    <div className="flex gap-3 items-center">
      <UserDropDown user={data} />
    </div>
  );
}