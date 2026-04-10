import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { RegisterFormType, registerSchema } from "@/lib/types/register";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignUpForm({
  onSubmit,
  switchForm,
}: {
  onSubmit: (data: RegisterFormType) => void;
  switchForm: any;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>({
    resolver: zodResolver(registerSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-2">
      <div className="flex flex-col gap-2">
        <Label htmlFor="first_name">First Name</Label>
        <Input
          id="first_name"
          type="text"
          placeholder="John"
          {...register("first_name")}
        />
        {errors.first_name && (
          <p className="text-sm text-red-500">{errors.first_name.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="last_name">Last Name</Label>
        <Input
          id="last_name"
          type="text"
          placeholder="Doe"
          {...register("last_name")}
        />
        {errors.last_name && (
          <p className="text-sm text-red-500">{errors.last_name.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="johndoe@example.com"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="********"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="phone_number">Phone Number</Label>
        <Input
          id="phone_number"
          type="tel"
          placeholder="98XXXXXXXX"
          {...register("phone_number")}
        />
        {errors.phone_number && (
          <p className="text-sm text-red-500">{errors.phone_number.message}</p>
        )}
      </div>

      <Button className="w-full mt-2" disabled={false}>
        {false ? "Registering..." : "Register"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <span className="underline cursor-pointer" onClick={switchForm}>Login</span>
      </p>
    </form>
  );
}
