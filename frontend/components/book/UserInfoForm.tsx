import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller, UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { UserFormType } from "@/lib/types/user";

export default function UserInfoForm({
  form,
  onSubmit,
}: {
  form: UseFormReturn<UserFormType>;
  onSubmit: (data: UserFormType) => void;
}) {
  return (
    <form id="form-rhf-user-info" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* FIRST NAME */}
        <Controller
          name="first_name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>First Name</FieldLabel>
              <Input {...field} aria-invalid={fieldState.invalid} />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* LAST NAME */}
        <Controller
          name="last_name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Last Name</FieldLabel>
              <Input {...field} aria-invalid={fieldState.invalid} />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* EMAIL */}
        <Controller
          name="user_email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Email</FieldLabel>
              <Input
                {...field}
                type="email"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* PHONE */}
        <Controller
          name="user_phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Phone</FieldLabel>
              <Input {...field} type="tel" aria-invalid={fieldState.invalid} />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* CITY */}
        <Controller
          name="user_city"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>City</FieldLabel>
              <Input {...field} aria-invalid={fieldState.invalid} />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* STATE */}
        <Controller
          name="user_state"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>State</FieldLabel>
              <Input {...field} aria-invalid={fieldState.invalid} />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* ADDRESS — FULL WIDTH */}
        <Controller
          name="user_address"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="md:col-span-2" data-invalid={fieldState.invalid}>
              <FieldLabel>Address</FieldLabel>
              <Input {...field} aria-invalid={fieldState.invalid} />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* POSTAL */}
        <Controller
          name="user_postal"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Postal Code</FieldLabel>
              <Input {...field} aria-invalid={fieldState.invalid} />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  );
}
