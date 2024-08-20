import { useEffect, useState, useCallback } from 'react';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Profile from '../Profile/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { hideAlert, showAlert } from '../../redux/features/slices/alertSlice';
import { CustomAlert } from '../../components/CustomAlert';

const DashboardUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const alert = useSelector((state: RootState) => state.alert);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleAlert = useCallback(() => {
    const profileUpdateStatus = sessionStorage.getItem("profileUpdateStatus");

    if (profileUpdateStatus) {
      if (profileUpdateStatus === "success") {
        dispatch(
          showAlert({
            severity: "success",
            text: "Profile updated successfully!",
          })
        );
      } else if (profileUpdateStatus === "error") {
        dispatch(
          showAlert({ severity: "error", text: "Failed to update profile." })
        );
      }

      sessionStorage.removeItem("profileUpdateStatus");
    }
  }, [dispatch]);

  useEffect(() => {
    handleAlert();
  }, [handleAlert]);

  useEffect(() => {
    if (alert.text) {
      const timer = setTimeout(() => {
        dispatch(hideAlert());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [alert.text, dispatch]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: 'var(--background-color)',
        color: 'var(--text-color)',
      }}
    >
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
          <Header onDrawerToggle={handleDrawerToggle} />
          {alert.text && (
            <CustomAlert severity={alert.severity} text={alert.text} />
          )}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              width: '100%',
              maxWidth: { sm: '1200px', xs: '100%' },
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
