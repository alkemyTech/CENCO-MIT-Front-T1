import React from "react";
import { Box, TextField } from "@mui/material";
import useUserFilters from "../../hooks/useUserFilters";

const SearchBar = () => {
  const { searchQuery, setSearchQuery, handleSearch } = useUserFilters();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "30px",
        width: { xs: "100%", sm: "100%" },
      }}
    >
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress} 
        placeholder="ej: carla o carla@example.com"
        sx={{
          width: "100%",
          marginRight: "10px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "16px",
            backgroundColor: "#fff",
          },
        }}
      />
    </Box>
  );
};

export default SearchBar;
