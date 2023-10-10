"use client";
import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { CircularProgress, Stack } from "@mui/material";

export type Authentication = {
  authenticated: boolean;
  access_token: string;
  user: null | { email: string; id: string; first_name:string; last_name:string };
};

type Context = {
  auth: Authentication;
  setAuth: (auth: Authentication) => void;
  signOut: () => void;
};
export const SignInProviderContext = createContext<Context>(
  {} as unknown as Context,
);
const LOCAL_STORAGE_KEY = "womenPlusPlusAuth";
export const SignInProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [auth, setAuth] = useState<Authentication>({
    authenticated: false,
    access_token: "",
    user: null,
  });

  const handleAuth = (auth: Authentication) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(auth));
    setAuth(auth);
  };
  useEffect(() => {
    const auth = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (auth) {
      setAuth(JSON.parse(auth));
    }
    setIsInitialized(true);
  }, []);
  const handleSignOut = () => {
    setAuth({ authenticated: false, access_token: "", user: null });
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };
  return (
    <SignInProviderContext.Provider
      value={{ auth, setAuth: handleAuth, signOut: handleSignOut }}
    >
      {isInitialized ? (
        children
      ) : (
        <Stack
          width={"100vw"}
          height={"100vh"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <CircularProgress />
        </Stack>
      )}
    </SignInProviderContext.Provider>
  );
};
