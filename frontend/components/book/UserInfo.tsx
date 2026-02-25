"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { userFormSchema, UserFormType } from "@/lib/types/user";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { UserType } from "@/lib/types/user";
import UserInfoForm from "./UserInfoForm";

export default function UserInfo({
  user_details,
  setUserDetails,
  onNext,
  userDetails,
}: {
  user_details: UserType;
  setUserDetails: React.Dispatch<React.SetStateAction<UserFormType | null>>;
  onNext: () => void;
  userDetails: UserFormType | null;
}) {
  const form = useForm<UserFormType>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      first_name: userDetails?.first_name || user_details.first_name || "",
      last_name: userDetails?.last_name || user_details.last_name || "",
      user_phone: userDetails?.user_phone || user_details.phone_number || "",
      user_state: userDetails?.user_state || user_details.state || "",
      user_address: userDetails?.user_address || user_details.address || "",
      user_city: userDetails?.user_city || user_details.city || "",
      user_email: userDetails?.user_email || user_details.email || "",
      user_postal: userDetails?.user_postal || user_details.postal_code || "",
    },
  });

  function onSubmit(data: UserFormType) {
    setUserDetails(data);
    onNext();
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Client Info</CardTitle>
        <CardDescription>
          Write the details of the client who needs the service
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UserInfoForm form={form} onSubmit={onSubmit} />
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-rhf-user-info">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
