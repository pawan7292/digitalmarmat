"use server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function forgotPassword(email: string) {
  const response = await fetch(`${API_URL}/api/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Something went wrong");
  return data;
}

export async function verifyForgotPasswordOtp(email: string, otp: string) {
  const response = await fetch(`${API_URL}/api/verify-forgot-password-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Invalid OTP");
  return data;
}

export async function resetPassword(
  email: string,
  otp: string,
  password: string,
  password_confirmation: string,
) {
  const response = await fetch(`${API_URL}/api/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp, password, password_confirmation }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Password reset failed");
  return data;
}
