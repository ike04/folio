import React from 'react';
import { Box, Container, Typography } from '@mui/material';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.95) 0%, rgba(23, 37, 84, 0.98) 100%)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        py: 6,
        mt: 8,
        position: 'relative',
        zIndex: 10,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography
              variant="h6"
              sx={{
                color: 'white',
                fontWeight: 700,
                mb: 1,
                background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Portfolio
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.875rem',
              }}
            >
              © {currentYear} All rights reserved.
            </Typography>
          </Box>

          <Box sx={{ textAlign: { xs: 'center', md: 'right' } }}>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.875rem',
              }}
            >
              Built with React & Material-UI
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
