"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useCreateContact } from "@/hooks/useContact";
import { toast } from "sonner";

type ContactFormData = {
  name: string;
  email: string;
  phone_number: string;
  message: string;
};

export default function ContactPage() {
  const createContactMutation = useCreateContact();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    toast.promise(createContactMutation.mutateAsync({ body: data }), {
      loading: "Sending message...",
      success: "Message sent successfully 🎉",
      error: "Failed to send message",
    });
    if (createContactMutation.isSuccess) {
      reset();
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 flex flex-col gap-8 sm:gap-10 md:gap-12">
      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">Contact us</div>

      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-sm justify-center sm:justify-around">
        <div>
          <div>
            <div className="text-lg">Phone Number</div>
          </div>
          <div>9802362210</div>
        </div>

        <div>
          <div className="text-lg">Email</div>
          <div>info.dmsservicenepal@gmail.com</div>
        </div>

        <div>
          <div className="text-lg">Address</div>
          <div>Kathmandu, Nepal</div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-center p-4">
          <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl sm:text-3xl">Contact Us</CardTitle>
              <CardDescription>
                We'd love to hear from you. Please fill out the form below.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="98XXXXXXXX"
                    {...register("phone_number", {
                      required: "Phone number is required",
                    })}
                  />
                  {errors.phone_number && (
                    <p className="text-sm text-red-500">
                      {errors.phone_number.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Write your message here..."
                    rows={5}
                    {...register("message", {
                      required: "Message is required",
                    })}
                  />
                  {errors.message && (
                    <p className="text-sm text-red-500">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={createContactMutation.isPending}
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
