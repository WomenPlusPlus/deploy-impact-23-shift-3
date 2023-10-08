"use client";
import { createContext, FC, PropsWithChildren, useState } from "react";

export type Authentication = {
  authenticated: boolean;
  user: null | { email: string; access_token: string };
};

type Context = {
  auth: Authentication;
  setAuth: (auth: Authentication) => void;
};
export const SignInProviderContext = createContext<Context>(
  {} as unknown as Context,
);

export const SignInProvider: FC<PropsWithChildren> = ({ children }) => {
  const [auth, setAuth] = useState<Authentication>({
    authenticated: false,
    user: null,
  });
  return (
    <SignInProviderContext.Provider value={{ auth, setAuth }}>
      {children}
    </SignInProviderContext.Provider>
  );
};
