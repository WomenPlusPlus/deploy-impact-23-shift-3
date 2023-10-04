import * as React from 'react';
import Box from '@mui/material/Box';

import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';

export const metadata = {
  title: 'Shift Login',
  description: 'Shift_Enter App - login page',
};


// const LINKS = [
//   { text: 'Home', href: '/', icon: HomeIcon },
//   { text: 'Starred', href: '/starred', icon: StarIcon },
//   { text: 'Tasks', href: '/tasks', icon: ChecklistIcon },
// ];

// const PLACEHOLDER_LINKS = [
//   { text: 'Settings', icon: SettingsIcon },
//   { text: 'Support', icon: SupportIcon },
//   { text: 'Logout', icon: LogoutIcon },
// ];

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
