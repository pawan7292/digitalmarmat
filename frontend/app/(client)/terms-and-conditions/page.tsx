const termsAndConditionsData = [
  {
    heading: "1. Definitions",
    subtitle: "",
    content:
      "User: Any individual or entity accessing or using the platform, including buyers and sellers.\nServices: Services listed, bought, or sold on the platform.",
  },
  {
    heading: "2. User Eligibility",
    subtitle: "To use our platform:",
    content:
      "You agree to provide accurate and complete information during registration.\nYou must comply with all applicable laws and regulations.",
  },
];

export default async function TermsAndConditions() {
  return (
    <div className="p-8 flex flex-col gap-4">
      <div className="text-4xl font-bold">Terms and conditions</div>
      <div className="text-gray-500">
        Welcome to Digital Marmat. These Terms and Conditions outline the rules
        and regulations for using our platform, which connects buyers and
        sellers for various services. By accessing or using our platform, you
        agree to comply with these Terms and Conditions. Please read them
        carefully.
      </div>
      {termsAndConditionsData.map((eachTerm) => {
        return (
          <div className="flex flex-col gap-2">
            <div className="text-xl font-bold">{eachTerm.heading}</div>
            {eachTerm.subtitle ?? <div>{eachTerm.subtitle}</div>}
            <div className="whitespace-pre-line">{eachTerm.content}</div>
          </div>
        );
      })}
      <div></div>
    </div>
  );
}
