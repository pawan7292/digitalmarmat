import * as z from "zod";

export const registerSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.email(),
  password: z.string().min(8),
  phone_number: z.string().min(9),
});

export type RegisterFormType = z.infer<typeof registerSchema>;
