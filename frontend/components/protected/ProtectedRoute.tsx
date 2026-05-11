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
    const checkUser = async () => {
      try {
        const data = await getUserData();
        setUser(data);
        // Auto-close dialog when user is authenticated
        if (data?.name) {
          setIsOpen(false);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    checkUser();
  }, []);

  const handleOpenChange = (open: boolean) => {
    // Don't allow closing the dialog if user is not authenticated
    if (!open && !user?.name) {
      setIsOpen(true);
      return;
    }
    setIsOpen(open);
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
          <SignUpFormContent switchForm={() => setIsLogin(true)} />
        )}
      </Dialog>
    );

  return <>{children}</>;
}
