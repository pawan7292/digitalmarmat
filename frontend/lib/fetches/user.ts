'use server'
import { cookies } from "next/headers";

export const getUserData = async () => {
  const token = (await cookies()).get("token")?.value;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
    headers: {
      accept: "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  const userData = await response.json();
  return userData;
};
