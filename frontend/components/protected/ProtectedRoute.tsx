"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserData } from "@/lib/fetches/user";
import { Dialog } from "../ui/dialog";
import LoginFormContent from "../login/LoginFormContent";
import SignUpFormContent from "../signup/SignUpFormContent";

export default function ProtectedRoutes({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback?: () => void;
}) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  /** Skip redirect when dialog closes because login/signup succeeded (Radix can fire onOpenChange(false) on unmount). */
  const skipCloseRedirectRef = useRef(false);

  useEffect(() => {
    getUserData().then((data) => {
      setUser(data);
      setLoading(false);
    });
  }, []);

  const markAuthNavigation = () => {
    skipCloseRedirectRef.current = true;
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      if (skipCloseRedirectRef.current) {
        skipCloseRedirectRef.current = false;
        return;
      }
      router.replace("/");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user?.name)
    return (
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        {isLogin ? (
          <LoginFormContent
            switchForm={() => setIsLogin(false)}
            setUser={setUser}
            onAuthNavigation={markAuthNavigation}
          />
        ) : (
          <SignUpFormContent
            switchForm={() => setIsLogin(true)}
            onAuthNavigation={markAuthNavigation}
          />
        )}
      </Dialog>
    );

  return <>{children}</>;
}
