import React, { useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterMenu from "../../components/FilterOptions";
import UserTable from "../../components/UserTable";
import SearchBar from "../../components/SearchBar";
import Register from "../FormRegister";

const UserManagementView = () => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterStatus, setFilterStatus] = useState<"" | "active" | "inactive">("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  // Add state for the modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Grid item xs={12} md={11}>
          <Grid container spacing={2}>
            <Grid item xs={9} md={10}>
              <SearchBar />
            </Grid>
            <Grid item xs={3} md={2} justifyContent="end" paddingLeft="0">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "var(--primary-color)",
                  color: "#fff",
                  borderRadius: "8px",
                  width: "100%",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#00a6d6",
                  },
                  "@media (max-width:600px)": {
                    fontSize: "10px",
                    width: "100%",
                  },
                }}
                onClick={handleOpen} // Attach the modal open function
              >
                Add user
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={1} display='flex' justifyContent='end' >
          <Button
            onClick={handleFilterClick}
            startIcon={<FilterListIcon />}
            sx={{
              borderRadius: "30px",
              textTransform: "none",
              background: "none",
              color: "inherit",
              justifyContent: 'end',
              padding: 0,
              minWidth: "auto",
              "&:hover": {
                color: "var(--primary-color)",
                backgroundColor: "transparent",
              },
              "@media (max-width:600px)": {
                width: "100%",
              },
            }}
          >
            Filters
          </Button>
        </Grid>
      </Grid>
      <FilterMenu
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        onSortOrderChange={setSortOrder}
        onStatusFilterChange={setFilterStatus}
      />
      <UserTable sortOrder={sortOrder} filterStatus={filterStatus} />

      {/* Add the Register component and pass the necessary props */}
      <Register open={open} handleClose={handleClose} />
    </Box>
  );
};

export default UserManagementView;
