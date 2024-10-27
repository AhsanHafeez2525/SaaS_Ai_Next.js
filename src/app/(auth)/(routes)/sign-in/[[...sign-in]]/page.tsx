import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignIn
      appearance={{
        elements: {
          formButtonPrimary: "bg-[#002D62] hover:bg-[#13274F] text-sm",
        },
      }}
    />
  );
}
