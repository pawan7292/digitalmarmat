import * as z from "zod";

export type UserType = {
  id: number;
  user_id: number;
  first_name?: string;
  last_name?: string;
  name?: string;
  mobile_number: string | null;
  gender: string;
  dob: string;
  address: string;
  postal_code: string;
  currency_code: string;
  phone_number: string;
  email: string;
  city: string;
  state: string;
  country: string;
};

export const userFormSchema = z.object({
  first_name: z
    .string()
    .min(2, "First name must be at least 2 characters long"),
  last_name: z.string().min(2, "Last name must be at least 2 characters long"),
  user_email: z.email(),
  user_phone: z.string(),
  user_city: z.string(),
  user_state: z.string(),
  user_address: z.string().min(2, "Address must be at least 2 characters long"),
  user_postal: z.string(),
  notes: z.string(),
});

export type UserFormType = z.infer<typeof userFormSchema>;
