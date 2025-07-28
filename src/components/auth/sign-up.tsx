"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { signUpWithEmailAndName } from "@/actions/auth-actions";
import { authClient } from "@/lib/pro/auth/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🎯 Signup form submitted");

    if (!firstName || !lastName || !email || !password || !passwordConfirmation) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== passwordConfirmation) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setError("");
    setMessage("");
    setMessage("Creating your account...");

    startTransition(async () => {
      console.log("🚀 Starting signup transition...");
      try {
        const name = `${firstName} ${lastName}`;
        const result = await signUpWithEmailAndName(email, password, name);
        console.log("📥 Result from signUpWithEmailAndName:", result);

        if (result.success) {
          setMessage("Account created successfully!");
          // Redirect to pro docs after successful signup
          router.push("/pro/docs");
        } else {
          setError(result.error || "Account creation failed");
        }
      } catch (err) {
        console.error("💥 Error during signup:", err);
        setError("An unexpected error occurred");
      }
    });
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Create PrismUI Pro Account</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Enter your information to create an account and get started with PrismUI Pro.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleEmailSignUp}>
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

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  id="first-name"
                  placeholder="Max"
                  required
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    setError("");
                    setMessage("");
                  }}
                  value={firstName}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  id="last-name"
                  placeholder="Robinson"
                  required
                  onChange={(e) => {
                    setLastName(e.target.value);
                    setError("");
                    setMessage("");
                  }}
                  value={lastName}
                />
              </div>
            </div>

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
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                  setMessage("");
                }}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password-confirmation">Confirm Password</Label>
              <Input
                id="password-confirmation"
                type="password"
                placeholder="Confirm Password"
                autoComplete="new-password"
                required
                value={passwordConfirmation}
                onChange={(e) => {
                  setPasswordConfirmation(e.target.value);
                  setError("");
                  setMessage("");
                }}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                "Create Account"
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
              Sign up with Google
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/pro/auth/login" className="hover:underline font-medium">
                Sign in
              </Link>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}