import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function MyJobsPage() {
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
               Candidate Jobs page
              </Typography>
              <Typography variant="h5" component="h2" gutterBottom>
                this should show all jobs shortlisted by the candidate
              </Typography>
              <Typography variant="body1">
                Coming soon...
              </Typography>
      </Box>
    </Container>
  );
}
