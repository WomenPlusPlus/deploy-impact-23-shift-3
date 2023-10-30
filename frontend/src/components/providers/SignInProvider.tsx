"use client";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { CircularProgress, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import Image from "next/image";

export type Role =
  | "association_user"
  | "company_user"
  | "candidate"
  | undefined;

export type Authentication = {
  authenticated: boolean;
  access_token: string;
  user: null | {
    id: string;
    first_name?: string;
    last_name?: string;
    preferred_name?: string;
  };
  role: Role;
};

type Context = {
  auth?: Authentication;
  setAuth: (auth: Authentication) => void;
  signOut: () => void;
  isLoggedIn: () => boolean;
};

export const SignInProviderContext = createContext<Context>(
  {} as unknown as Context,
);
const LOCAL_STORAGE_KEY = "womenPlusPlusAuth";
const getStorage = (): Storage => {
  return localStorage;
};
export const SignInProvider: FC<PropsWithChildren> = ({ children }) => {
  const [auth, setAuth] = useState<Authentication>();
  useEffect(() => {
    if (!auth) {
      const localStorageAuth = getStorage().getItem(LOCAL_STORAGE_KEY);
      const initialValue = localStorageAuth
        ? JSON.parse(localStorageAuth)
        : {
            authenticated: false,
            access_token: "",
            user: null,
            role: undefined,
          };
      setAuth(initialValue);
    }
  }, [auth]);
  const handleAuth = (auth: Authentication) => {
    getStorage().setItem(LOCAL_STORAGE_KEY, JSON.stringify(auth));
    setAuth(auth);
  };

  const handleSignOut = () => {
    setAuth({
      authenticated: false,
      access_token: "",
      user: null,
      role: undefined,
    });
    getStorage().removeItem(LOCAL_STORAGE_KEY);
  };

  const isLoggedIn = () => {
    if (!auth?.authenticated) {
      return false;
    }
    //@TODO check token expiration time
    return true;
  };

  return (
    <SignInProviderContext.Provider
      value={{ auth, setAuth: handleAuth, signOut: handleSignOut, isLoggedIn }}
    >
      {auth ? (
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
export const Guard = ({
  children,
  role,
}: PropsWithChildren & { role: Role }) => {
  const context = useContext(SignInProviderContext);
  if (!context.isLoggedIn || context.auth?.role !== role) {
    return (
      <Stack
        width={"100%"}
        height={"100vh"}
        alignItems={"center"}
        justifyContent={"center"}
        textAlign={"center"}
      >
        <Stack
          display={"flex"}
          flexDirection={"column"}
          sx={{ textAlign: "center" }}
        >
          <Stack
            sx={{ display: "flex", justifyContent: "center", margin: "0 auto" }}
          >
            <Image
              src="/images/Interdit.png"
              alt="Image for Interdit page"
              width={440}
              height={375}
            />
          </Stack>
          <Stack sx={{ padding: "24px" }}>
            <Typography
              sx={{ fontSize: "24px", fontWeight: "400", lineHeight: "32px" }}
              color="text.secondary"
              gutterBottom
            >
              Ups! It seems you are not authorized to access this page!
            </Typography>
            <Typography
              sx={{ fontSize: "16px", fontWeight: "400", lineHeight: "24px" }}
            >
              Please check your login role, you are registered as &nbsp;
              {context.auth?.role}. Make sure you are logging into the account
              with the correct email.
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    );
  }
  return <>{children}</>;
};
