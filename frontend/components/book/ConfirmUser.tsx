import { UserFormType } from "@/lib/types/user";

export default function ConfirmUser({
  user_details,
  setUser,
}: {
  user_details: UserFormType;
  setUser: any;
}) {
  const update = (key: keyof UserFormType, value: string) => {
    setUser({ ...user_details, [key]: value });
  };

  const input =
    "w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-brand-raiden-500 focus:border-brand-raiden-500";

  const label = "text-sm font-medium text-gray-700";

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Contact Info */}
      <div className="flex flex-col gap-4">
        <div className="text-lg font-semibold text-brand-raiden-500">
          Contact Information
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className={label}>First Name *</label>
            <input
              className={input}
              value={user_details.first_name}
              onChange={(e) => update("first_name", e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className={label}>Last Name *</label>
            <input
              className={input}
              value={user_details.last_name}
              onChange={(e) => update("last_name", e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className={label}>Email Address *</label>
          <input
            className={input}
            type="email"
            value={user_details.user_email}
            onChange={(e) => update("user_email", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className={label}>Phone Number *</label>
          <input
            className={input}
            value={user_details.user_phone}
            onChange={(e) => update("user_phone", e.target.value)}
          />
        </div>
      </div>

      {/* Address */}
      <div className="flex flex-col gap-4">
        <div className="text-lg font-semibold text-brand-raiden-500">
          Service Address
        </div>

        <div className="flex flex-col gap-1">
          <label className={label}>Full Address *</label>
          <input
            className={input}
            value={user_details.user_address}
            onChange={(e) => update("user_address", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1">
            <label className={label}>City *</label>
            <input
              className={input}
              value={user_details.user_city}
              onChange={(e) => update("user_city", e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className={label}>State *</label>
            <input
              className={input}
              value={user_details.user_state}
              onChange={(e) => update("user_state", e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className={label}>Postal Code *</label>
            <input
              className={input}
              value={user_details.user_postal}
              onChange={(e) => update("user_postal", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="flex flex-col gap-1">
        <label className="text-lg font-semibold text-brand-raiden-500">
          Additional Notes
        </label>
        <textarea
          className={`${input} min-h-[120px]`}
          placeholder="Any instructions for technician..."
          value={user_details.notes}
          onChange={(e) => update("notes", e.target.value)}
        />
      </div>
    </div>
  );
}
