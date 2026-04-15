import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLogin } from "@/hooks/useUser";
import GoogleLoginButton from "./GoogleLoginButton";

export default function LoginFormContent({
  switchForm,
  setUser,
}: {
  switchForm: any;
  setUser: any;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const loginMutation = useLogin();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    loginMutation.mutate(
      { email, password },
      {
        onError: () => {
          setError("Invalid email or password");
        },
        onSuccess: (response) => {
          console.log(response)
          setUser(response.user)
          window.location.reload()
        }
      },
    );
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="text-center text-2xl">Welcome Back</DialogTitle>
      </DialogHeader>

      <Card className="border-none shadow-none">
        <form onSubmit={handleLogin} className="flex flex-col gap-4 p-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <Button className="w-full mt-2" disabled={loginMutation.isPending}>
            {loginMutation.isPending ? "Logging in..." : "Login"}
          </Button>

          <div className="flex items-center gap-4 my-4">
            <div className="flex-1 h-px bg-border"></div>
            <span className="text-xs text-muted-foreground">OR</span>
            <div className="flex-1 h-px bg-border"></div>
          </div>

          <GoogleLoginButton />

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <span className="underline cursor-pointer" onClick={switchForm}>
              Sign up
            </span>
          </p>
        </form>
      </Card>
    </DialogContent>
  );
}
