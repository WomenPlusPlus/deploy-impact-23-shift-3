"use client";
import * as React from "react";

import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import TanStackProvider from "@/components/providers/TanStackProvider";
import { SignInProvider } from "@/components/providers/SignInProvider";

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
