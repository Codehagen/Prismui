import UnifiedAuth from "@/components/auth/unified-auth";

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