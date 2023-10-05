'use client'
import AppBar from '@mui/material/AppBar';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Header() {
    return (
       
       <AppBar position="fixed" sx={{ zIndex: 2000 }}>
            <Toolbar sx={{ backgroundColor: 'orange' }}>
              <DashboardIcon sx={{ color: '#444', mr: 2, transform: 'translateY(-2px)' }} />
              <Typography variant="h6" noWrap component="div" color="black">
                Shift
              </Typography>
            </Toolbar>
          </AppBar> 
          
    )
  }
  
  
  