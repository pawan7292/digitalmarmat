"use client";

import { useEffect, useState } from "react";
import { useLogout } from "@/hooks/useUser";
import LoginFormContent from "../login/LoginFormContent";
import SignUpFormContent from "../signup/SignUpFormContent";
import { Dialog, DialogTrigger } from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { CiUser } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUserData } from "@/lib/fetches/user";

export default function UserButtons() {
  const { mutate: logout } = useLogout();
  const [activeForm, setActiveForm] = useState<"login" | "signup">("login");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    getUserData().then((data) => {
      setUser(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <CiUser
        size={24}
        className="animate-pulse text-gray-400 cursor-not-allowed"
      />
    );
  }

  if (!user?.name) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <CiUser size={24} className="cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-48 p-4 gap-2 flex flex-col"
        >
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full text-sm"
                onClick={() => setActiveForm("login")}
              >
                Login
              </Button>
            </DialogTrigger>
            <DialogTrigger asChild>
              <Button
                variant="default"
                className="w-full text-sm"
                onClick={() => setActiveForm("signup")}
              >
                Sign Up
              </Button>
            </DialogTrigger>

            {activeForm === "login" ? (
              <LoginFormContent
                switchForm={() => setActiveForm("signup")}
                setUser={setUser}
              />
            ) : (
              <SignUpFormContent switchForm={() => setActiveForm("login")} />
            )}
          </Dialog>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <CiUser size={24} className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <Link href="/profile">
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </Link>
          <Link href="/profile/bookings">
            <DropdownMenuItem>Bookings</DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            setUser(null);
            logout();
            window.location.reload();
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
