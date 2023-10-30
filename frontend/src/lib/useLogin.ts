"use client";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import {
  Role,
  SignInProviderContext,
} from "@/components/providers/SignInProvider";
import { useRouter } from "next/navigation";
import API_BASE_URL from "@/config";

interface Credentials {
  email: string;
  password: string;
}
interface LoginResponse {
  access_token: string;
  expires_at: string;
  expires_in: string;
  id: string;
  first_name?: string;
  last_name?: string;
  preferred_name?: string;
  last_sign_in_a: string;
  role: Role;
  token_type: string;
}
export const useLogin = (): [
  (props: { email: string; password: string }) => void,
  undefined | { message: string },
  boolean,
] => {
  const signInContext = useContext(SignInProviderContext);
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (credentials: Credentials) => {
      const response = await fetch(`${API_BASE_URL}/api/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
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
        user: {
          id: response.id,
          first_name: response.first_name,
          preferred_name: response.preferred_name,
          last_name: response.last_name,
        },
        role: response.role,
      });

      if (response.role === "candidate") {
        router.replace("/candidate/profile");
      } else if (response.role === "association_user") {
        router.replace("/association/profile");
      } else if (response.role === "company_user") {
        router.replace("/company/jobs");
      }
    },
  });

  return [
    mutation.mutate,
    mutation.error as undefined | { message: string },
    mutation.isLoading,
  ];
};
