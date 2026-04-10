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
    <div className="p-4 sm:p-6 md:p-8 flex flex-col gap-6 sm:gap-8 md:gap-10">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
        Contact Us
      </h1>

      {/* Contact Info */}
      <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4 sm:gap-6 text-sm justify-center sm:justify-around text-center sm:text-left">
        <div>
          <h2 className="text-lg font-semibold">Phone</h2>
          <p>9802362210</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Email</h2>
          <p>info.dmsservicenepal@gmail.com</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Address</h2>
          <p>Kathmandu, Nepal</p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="flex justify-center">
        <Card className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg shadow-lg">
          <CardHeader className="text-center px-4 pt-6">
            <CardTitle className="text-xl sm:text-2xl md:text-3xl font-semibold">
              Get in Touch
            </CardTitle>
            <CardDescription className="text-sm sm:text-base mt-1">
              We'd love to hear from you. Fill out the form below.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-4 pb-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <div className="space-y-1">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1">
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
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-1">
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
                  <p className="text-xs text-red-500">
                    {errors.phone_number.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-1">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Write your message here..."
                  rows={4}
                  {...register("message", { required: "Message is required" })}
                />
                {errors.message && (
                  <p className="text-xs text-red-500">{errors.message.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full py-2"
                disabled={createContactMutation.isPending}
              >
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}