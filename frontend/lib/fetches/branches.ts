'use server'

import { cookies } from "next/headers";

export const getBranches = async () => {
  const token = (await cookies()).get("token")?.value;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/branches`,
    {
      headers: {
        accept: "application/json",
        authorization: `Bearer ${token}`,
      },
    },
  );
  const branchesData = await response.json();
  return branchesData;
};