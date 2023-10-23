"use client";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { SignInProviderContext } from "@/components/providers/SignInProvider";
import { useRouter } from "next/navigation";

interface Credentials {
  email: string;
  password: string;
}
interface LoginResponse {
  access_token: string;
  expires_at: string;
  expires_in: string;
  id: string;
  last_sign_in_a: string;
  role: string;
  token_type: string;
}
export const useLogin = (): [
  (props: { email: string; password: string }) => void,
  undefined | { message: string },
] => {
  const signInContext = useContext(SignInProviderContext);
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (credentials: Credentials) => {
      const response = await fetch(
        "https://django-backend-shift-enter-u53fbnjraa-oe.a.run.app/api/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        },
      );
      if (response.status === 500) {
        throw new Error("Login failed")!;
      }
      if (response.status >= 300) {
        try {
          const errorResponse = await response.json();
          throw new Error(errorResponse?.error_description || "Login failed!");
        } catch (error) {
          throw error;
        }
      }
      return await response.json();
    },
    onError: (error: Error, variables, context) => {
      console.error("An error occurred during mutation:", error);
    },
    onSuccess: (response: LoginResponse) => {
      signInContext.setAuth({
        authenticated: true,
        access_token: response.access_token,
        user: { id: response.id },
        role: response.role,
      });

      if (response.role === "candidate") {
        router.push("/candidate/profile");
      } else if (response.role === "association_user") {
        router.push("/association/profile");
      } else if (response.role === "company_user") {
        router.push("/company/profile");
      }
    },
  });

  return [mutation.mutate, mutation.error as undefined | { message: string }];
};
