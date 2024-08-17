import { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Profile from '../Profile/Profile';

const DashboardUser = () => {

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', minHeight: '100vh', backgroundColor: 'var(--background-color)', color: 'var(--text-color)' }}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' }, 
          width: '100%',
          maxWidth: { sm: '1500px', xs: '100%' }, 
          boxSizing: 'border-box',
        }}
      >
        <Sidebar open={drawerOpen} onDrawerToggle={handleDrawerToggle} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            marginLeft: { sm: '250px', xs: '0' },
            boxSizing: 'border-box',
            width: '100%',
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: { sm: '1200px', xs: '100%' }, 
              mx: 'auto',
            }}
          >
            <Header onDrawerToggle={handleDrawerToggle} />
          </Box>

          <Box
            component="main"
            sx={{
              flexGrow: 1,
              width: '100%',
              maxWidth: { sm: '1200px', xs: '100%' }, // Asegurar que el ancho sea consistente con el header
              padding: { xs: 2, sm: 3 },
              mx: 'auto',
              boxSizing: 'border-box',
              overflowX: 'hidden',
            }}
          >
            <Profile />
          </Box>
          
          <Footer />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardUser;
