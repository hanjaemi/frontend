"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { JaemiLogo } from "@/components/jaemi-logo";

const trustedPartners = [
  {
    name: "Seoul National University",
    logo: "/placeholder.svg?height=30&width=120",
  },
  {
    name: "Korean Cultural Center",
    logo: "/placeholder.svg?height=30&width=120",
  },
  {
    name: "King Sejong Institute",
    logo: "/placeholder.svg?height=30&width=120",
  },
  { name: "TOPIK Organization", logo: "/placeholder.svg?height=30&width=120" },
];

type RegistrationStep = "email" | "details" | "verification";

interface RegistrationState {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<RegistrationStep>("email");
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState<RegistrationState>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const updateFormState = (field: keyof RegistrationState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();

    if (currentStep === "email") {
      if (!validateEmail(formState.email)) {
        toast.error("Please enter a valid email address");
        return;
      }
      setCurrentStep("details");
    } else if (currentStep === "details") {
      if (!formState.firstName || !formState.lastName) {
        toast.error("Please fill in all name fields");
        return;
      }
      if (!validatePassword(formState.password)) {
        toast.error("Password must be at least 8 characters long");
        return;
      }
      if (formState.password !== formState.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Here you would typically make an API call to create the user
        console.log("Registration successful:", formState);

        toast.success("Registration successful!");
        router.push("/study");
      } catch (error) {
        toast.error("Registration failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleGoogleSignIn = () => {
    // Implement Google Sign In
    toast.info("Google Sign In would be implemented here");
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
      case "details":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="First name"
                value={formState.firstName}
                onChange={(e) => updateFormState("firstName", e.target.value)}
                required
                className=""
              />
              <Input
                placeholder="Last name"
                value={formState.lastName}
                onChange={(e) => updateFormState("lastName", e.target.value)}
                required
                className=""
              />
            </div>
            <Input
              type="password"
              placeholder="Create password"
              value={formState.password}
              onChange={(e) => updateFormState("password", e.target.value)}
              required
              className=""
            />
            <Input
              type="password"
              placeholder="Confirm password"
              value={formState.confirmPassword}
              onChange={(e) =>
                updateFormState("confirmPassword", e.target.value)
              }
              required
              className=""
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center">
            <JaemiLogo size={48} />
            <h1 className="mt-6 text-3xl font-bold">
              Create your free account
            </h1>
            <p className="mt-2 text-center text-sm text-gray-400">
              {currentStep === "email"
                ? "Create your free account to start learning Korean. No credit card required."
                : "Just a few more details to get started"}
            </p>
          </div>

          <form onSubmit={handleContinue} className="mt-8 space-y-6">
            {currentStep === "email" && (
              <Button
                type="button"
                variant="outline"
                className="w-full  hover:bg-gray-100"
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
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className=" px-2 text-gray-400">or</span>
                </div>
              </div>
            )}

            <div className="space-y-4">{renderFormFields()}</div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Continue"
              )}
            </Button>

            {currentStep === "email" && (
              <p className="text-center text-xs text-gray-400">
                By continuing, you agree to Jaemi's{" "}
                <Link href="/terms" className="underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline">
                  Privacy Policy
                </Link>
                .
              </p>
            )}
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <Link href="/login" className="hover:underline">
                Log in
              </Link>
            </p>
          </div>

          {/* {currentStep === "email" && (
            <div className="space-y-4">
              <p className="text-center text-xs text-gray-400">
                Trusted by teams at
              </p>
              <div className="flex flex-wrap justify-center gap-8">
                {trustedPartners.map((partner) => (
                  <img
                    key={partner.name}
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    className="h-8 object-contain opacity-50"
                  />
                ))}
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}
