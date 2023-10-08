import * as React from "react";

import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";

//for query
import TanStackProvider from "@/components/providers/TanStackProvider";
import { SignInProvider } from "@/components/providers/SignInProvider";

export const metadata = {
  title: "Shift Authentication",
  description: "Shift_Enter App - Authentication",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <ThemeRegistry>
          <TanStackProvider>
            <SignInProvider>{children}</SignInProvider>
          </TanStackProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
