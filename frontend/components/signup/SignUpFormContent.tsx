"use client";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import SignUpForm from "./SignUpForm";
import { toast } from "sonner";
import { useRegisterUser, useVerifyOtp } from "@/hooks/useSignUp";
import { RegisterFormType } from "@/lib/types/register";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignUpFormContent({ switchForm }: { switchForm: any }) {
  const [isOtp, setIsOtp] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState("");
  const [expiry, setExpiry] = useState<number | null>(null); // timestamp in ms
  const [timeLeft, setTimeLeft] = useState("00:00");
  const registerUserMutation = useRegisterUser();
  const verifyOtpMutation = useVerifyOtp();

  // Handle OTP countdown
  useEffect(() => {
    if (!expiry) return;

    const interval = setInterval(() => {
      const diffMs = expiry - new Date().getTime();
      if (diffMs <= 0) {
        setTimeLeft("Expired");
        clearInterval(interval);
      } else {
        const minutes = Math.floor(diffMs / 1000 / 60);
        const seconds = Math.floor((diffMs / 1000) % 60);
        setTimeLeft(
          `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`,
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiry]);

  const onSubmit = async (data: RegisterFormType) => {
    setEmail(data.email);
    toast.promise(
      registerUserMutation.mutateAsync(
        { body: data },
        {
          onSuccess: (response) => {
            const expiryTime = new Date(response?.time_till).getTime();
            setExpiry(expiryTime);
            setIsOtp(true);
          },
        },
      ),
      {
        loading: "Registering User....",
        success: "User Registered Successfully",
        error: "Error registering User",
      },
    );
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // allow only 1 digit
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // auto-focus next input
    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyOtp = () => {
    toast.promise(
      verifyOtpMutation.mutateAsync(
        {
          body: {
            email: email,
            otp: otp.join(""),
          },
        },
        {
          onSuccess: () => {
            window.location.reload();
          },
        },
      ),
      {
        loading: "Verifying Otp",
        success: "User Activated",
        error: "Cannot Verify Otp",
      },
    );
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="text-center text-2xl">
          {isOtp ? "Check Your Email" : "Sign Up"}
        </DialogTitle>
      </DialogHeader>

      <Card className="border-none shadow-none p-6">
        {isOtp ? (
          <div className="flex flex-col items-center gap-4">
            <p>Enter the 6-digit OTP sent to your email</p>
            <div className="flex gap-2">
              {otp.map((digit, i) => (
                <Input
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  className="w-12 text-center text-lg"
                />
              ))}
            </div>
            <p>Expires in: {timeLeft}</p>
            <Button className="mt-4 w-full" onClick={handleVerifyOtp}>
              Verify OTP
            </Button>
          </div>
        ) : (
          <SignUpForm onSubmit={onSubmit} switchForm={switchForm} />
        )}
      </Card>
    </DialogContent>
  );
}
