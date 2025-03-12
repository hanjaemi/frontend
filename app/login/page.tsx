"use client";

import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { JaemiLogo } from "@/components/jaemi-logo";

type LoginStep = "email" | "password";

interface LoginState {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<LoginStep>("email");
  const [formState, setFormState] = useState<LoginState>({
    email: "",
    password: "",
  });

  const updateFormState = (field: keyof LoginState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();

    if (currentStep === "email") {
      if (!validateEmail(formState.email)) {
        toast.error("Please enter a valid email address");
        return;
      }
      setCurrentStep("password");
    } else if (currentStep === "password") {
      if (!formState.password) {
        toast.error("Please enter your password");
        return;
      }

      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Here you would typically make an API call to authenticate the user
        console.log("Login attempt:", formState);

        toast.success("Login successful!");
        router.push("/youtube");
      } catch (error) {
        toast.error(
          "Login failed. Please check your credentials and try again."
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleGoogleSignIn = () => {
    // Implement Google Sign In
    toast.info("Google Sign In would be implemented here");
  };

  const handleSeeOtherOptions = () => {
    toast.info("Other sign-in options would be shown here");
  };

  const renderFormFields = () => {
    switch (currentStep) {
      case "email":
        return (
          <Input
            type="email"
            placeholder="Enter email address"
            value={formState.email}
            onChange={(e) => updateFormState("email", e.target.value)}
            required
            className=""
          />
        );
      case "password":
        return (
          <Input
            type="password"
            placeholder="Enter password"
            value={formState.password}
            onChange={(e) => updateFormState("password", e.target.value)}
            required
            className=""
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center">
            <JaemiLogo />
            <h1 className="mt-6 text-3xl font-bold">Welcome back</h1>
          </div>

          <form onSubmit={handleContinue} className="mt-8 space-y-6">
            {currentStep === "email" && (
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGoogleSignIn}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </Button>
            )}

            {currentStep === "email" && (
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleSeeOtherOptions}
              >
                See other options
              </Button>
            )}

            {currentStep === "email" && (
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="px-2 text-gray-400">or</span>
                </div>
              </div>
            )}

            <div className="space-y-4">{renderFormFields()}</div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Continue"
              )}
            </Button>

            {currentStep === "password" && (
              <div className="text-center">
                <Link
                  href="/forgot-password"
                  className="text-sm text-gray-400 "
                >
                  Forgot password?
                </Link>
              </div>
            )}
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-400">
              Don't have an account?{" "}
              <Link href="/register" className="hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
