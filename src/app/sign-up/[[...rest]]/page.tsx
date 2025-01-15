import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full viewport height
        backgroundColor: "#f8f9fa", // Optional: Add a background color
      }}
    >
      <SignUp routing="path" path="/sign-up" />
    </div>
  );
}
