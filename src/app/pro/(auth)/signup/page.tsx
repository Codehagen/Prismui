import SignUp from "@/components/auth/sign-up";
import { getCurrentUser } from "@/lib/pro/auth/user-actions";

export default async function SignupPage() {
  return (
    <main className="flex flex-col items-center justify-start min-h-[80vh] w-full py-20 px-5">
      <h1 className="text-3xl md:text-4xl font-medium tracking-tight mb-2">
        Create PrismUI Pro Account
      </h1>
      <p className="text-muted-foreground mb-8 text-center max-w-md">
        Join thousands of developers building amazing UIs with PrismUI Pro.
      </p>
      <SignUp />
    </main>
  );
}
