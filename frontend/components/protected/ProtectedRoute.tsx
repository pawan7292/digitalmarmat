"use client";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    getUserData().then((data) => {
      setUser(data);
      setLoading(false);
    });
  }, []);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    // If dialog is closing (open = false), navigate back
    if (!open) {
      router.back();
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
          />
        ) : (
          <SignUpFormContent
            switchForm={() => setIsLogin(true)}
          />
        )}
      </Dialog>
    );

  return <>{children}</>;
}
