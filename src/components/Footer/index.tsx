import React from 'react';
import { Typography, Box, SxProps } from '@mui/material';

interface FooterProps {
  sx?: SxProps; 
}
const Footer: React.FC<FooterProps> = ({ sx }) => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        textAlign: 'center',
        py: 3,
        width: '100%',
        '@media (min-width: 600px)': {
          width: `calc(100% - 250px)`,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
        ...sx, 
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © 2024 alketalent. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
