import UnifiedAuth from "@/components/auth/unified-auth";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Sign In - PrismUI Pro",
  description: "Sign in to your PrismUI Pro account to access premium React components and exclusive content. Get instant access to advanced templates, pro animations, and priority support after logging in.",
  canonical: "https://www.prismui.tech/pro/login",
});

export default function LoginPage() {
  return (
    <main className="flex flex-col items-center justify-start min-h-[80vh] w-full py-20 px-5">
      <h1 className="text-3xl md:text-4xl font-medium tracking-tight mb-2">
        Sign in to PrismUI Pro
      </h1>
      <p className="text-muted-foreground mb-8 text-center max-w-md">
        Enter your email and password. We'll create an account for you if you don't have one.
      </p>
      <UnifiedAuth />
    </main>
  );
}