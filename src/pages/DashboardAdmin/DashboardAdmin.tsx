import { useEffect, useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/features/slices/userSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { CustomAlert } from "../../components/CustomAlert";

import { hideAlert, showAlert } from "../../redux/features/slices/alertSlice";

const DashboardAdmin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const alert = useSelector((state: RootState) => state.alert);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleAlert = () => {
    const deleteStatus = sessionStorage.getItem("deleteStatus");
    const createStatus = sessionStorage.getItem("createStatus");

    if (deleteStatus) {
      if (deleteStatus === "success") {
        dispatch(
          showAlert({
            severity: "success",
            text: "User deleted successfully!",
          })
        );
      } else if (deleteStatus === "error") {
        dispatch(
          showAlert({ severity: "error", text: "Failed to delete user." })
        );
      }
    }

    if (createStatus) {
      if (createStatus === "success") {
        dispatch(
          showAlert({
            severity: "success",
            text: "User created successfully!",
          })
        );
      } else if (createStatus === "error") {
        dispatch(
          showAlert({ severity: "error", text: "Failed to create user." })
        );
      }
    }

    // Clean up sessionStorage and hide alert after 3 seconds
    setTimeout(() => {
      sessionStorage.removeItem("deleteStatus");
      sessionStorage.removeItem("createStatus");
      dispatch(hideAlert());
    }, 3000);
  };

  useEffect(() => {
    handleAlert();
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "var(--background-color)",
        color: "var(--text-color)",
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          width: "100%",
          maxWidth: { sm: "1500px", xs: "100%" },
          boxSizing: "border-box",
        }}
      >
        <Sidebar open={drawerOpen} onDrawerToggle={handleDrawerToggle} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            marginLeft: { sm: "250px", xs: "0" },
            boxSizing: "border-box",
            width: "100%",
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
              padding: { xs: 2, sm: 3 },
              width: "100%",
              boxSizing: "border-box",
              overflowX: "hidden",
            }}
          >
            <Outlet />
          </Box>
          <Footer />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardAdmin;
