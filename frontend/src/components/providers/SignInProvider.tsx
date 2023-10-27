"use client";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { CircularProgress, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

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
  auth: Authentication;
  setAuth: (auth: Authentication) => void;
  signOut: () => void;
  isLoggedIn: () => boolean;
};

export const SignInProviderContext = createContext<Context>(
  {} as unknown as Context,
);
const LOCAL_STORAGE_KEY = "womenPlusPlusAuth";
export const SignInProvider: FC<PropsWithChildren> = ({ children }) => {
  const localStorageAuth = localStorage.getItem(LOCAL_STORAGE_KEY);
  const initialValue = localStorageAuth
    ? JSON.parse(localStorageAuth)
    : {
        authenticated: false,
        access_token: "",
        user: null,
        role: undefined,
      };

  const [auth, setAuth] = useState<Authentication>(initialValue);

  const handleAuth = (auth: Authentication) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(auth));
    setAuth(auth);
  };

  const handleSignOut = () => {
    setAuth({
      authenticated: false,
      access_token: "",
      user: null,
      role: undefined,
    });
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const isLoggedIn = () => {
    if (!auth?.authenticated) {
      return false;
    }
    //@TODO check token expiration time, ATM the token is not correct so cant test
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
  if (!context.isLoggedIn || context.auth.role !== role) {
    return (
      <Stack
        width={"100%"}
        height={"100vh"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Card>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              You are not authorized to access this page!
            </Typography>
            <Typography>Role needed: {role}.</Typography>
            <Typography>Current role: {context.auth.role}</Typography>
          </CardContent>
        </Card>
      </Stack>
    );
  }
  return <>{children}</>;
};
