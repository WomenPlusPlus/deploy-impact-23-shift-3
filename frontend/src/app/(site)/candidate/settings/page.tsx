'use client'
import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function SettingsPage() {
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
            <Typography variant="h3" component="h1" gutterBottom sx={{mt:5}}>
               Candidate - Settings page
              </Typography>
              <Typography variant="h5" component="h2" gutterBottom>
                this is where the candidate can update there settings
              </Typography>
              <Typography variant="body1">
               not sure what settings?
              </Typography>
      </Box>
    </Container>
  );
}
