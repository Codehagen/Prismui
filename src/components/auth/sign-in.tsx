"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { signInOrCreateUser } from "@/actions/auth-actions";
import { authClient } from "@/lib/pro/auth/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🎯 Form submitted with:", { email, password: "***" });

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setError("");
    setMessage("");
    setMessage("Attempting authentication...");

    startTransition(async () => {
      console.log("🚀 Starting transition, calling signInOrCreateUser...");
      try {
        const result = await signInOrCreateUser(email, password);
        console.log("📥 Result from signInOrCreateUser:", result);

        if (result.success) {
          if (result.wasCreated) {
            setMessage("New account created and signed in successfully!");
          } else {
            setMessage("Signed in successfully!");
          }
          // Redirect to pro docs after successful authentication
          router.push("/pro/docs");
        } else {
          setError(result.error || "Authentication failed");
        }
      } catch (err) {
        console.error("💥 Error during sign-in:", err);
        setError("An unexpected error occurred");
      }
    });
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Sign In to PrismUI Pro</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Enter your email below to login to your account. If you don't have an account, we'll create one for you automatically.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleEmailSignIn}>
          <div className="grid gap-4">
            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
                {error}
              </div>
            )}

            {message && (
              <div className="p-3 text-sm text-green-500 bg-green-50 border border-green-200 rounded-md">
                {message}
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                  setMessage("");
                }}
                value={email}
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/pro/auth/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>

              <Input
                id="password"
                type="password"
                placeholder="password"
                autoComplete="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                  setMessage("");
                }}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                "Sign In / Create Account"
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full gap-2"
              disabled={loading}
              onClick={async () => {
                await authClient.signIn.social(
                  {
                    provider: "google",
                    callbackURL: "/pro/docs",
                  },
                  {
                    onRequest: () => {
                      setLoading(true);
                    },
                    onResponse: () => {
                      setLoading(false);
                    },
                  }
                );
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="0.98em" height="1em" viewBox="0 0 256 262">
                <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
                <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
                <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"></path>
                <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
              </svg>
              Sign in with Google
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}