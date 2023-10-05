import * as React from 'react';
import Box from '@mui/material/Box';

import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';

export const metadata = {
  title: 'Shift Authentication',
  description: 'Shift_Enter App - Authentication',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <Box>
          {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
