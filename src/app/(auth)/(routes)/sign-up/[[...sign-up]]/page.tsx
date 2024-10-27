import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignUp
      appearance={{
        elements: {
          formButtonPrimary: "bg-[#002D62] hover:bg-[#13274F] text-sm",
        },
      }}
    />
  );
}
