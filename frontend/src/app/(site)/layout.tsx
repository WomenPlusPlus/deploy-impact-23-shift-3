import * as React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import ChecklistIcon from '@mui/icons-material/Checklist';
import SettingsIcon from '@mui/icons-material/Settings';
import SupportIcon from '@mui/icons-material/Support';
import LogoutIcon from '@mui/icons-material/Logout';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';

import Header from './header'
import Footer from './footer'

export const metadata = {
  title: 'Shift',
  description: 'Shift_Enter App',
};

const DRAWER_WIDTH = 240;

const LINKS = [
  { text: 'Home', href: '/', icon: HomeIcon },
  { text: 'sign in', href: '/signin', icon: StarIcon },
  { text: 'candidate', href: '/candidate', icon: ChecklistIcon },
  { text: 'company', href: '/company', icon: ChecklistIcon },
];

const PLACEHOLDER_LINKS = [
  { text: 'Settings', icon: SettingsIcon },
  { text: 'Support', icon: SupportIcon },
  { text: 'Logout', icon: LogoutIcon },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>

         <Header />
  
            <List sx={{marginTop:'50px'}}>
              {LINKS.map(({ text, href, icon: Icon }) => (
                <ListItem key={href} disablePadding>
                  <ListItemButton component={Link} href={href}>
                    <ListItemIcon>
                      <Icon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
       
          <Box
            component="main"
            // sx={{
            //   flexGrow: 1,
            //   bgcolor: 'background.default',
            //   ml: `${DRAWER_WIDTH}px`,
            //   mt: ['48px', '56px', '64px'],
            //   p: 3,
            // }}
          >
            {children}
          </Box>

          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
}
