import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';

interface UserTableHeaderProps {
  itemsPerPage: number;
  onItemsPerPageChange: (event: SelectChangeEvent<number>) => void;
}

function UserTableHeader({ itemsPerPage, onItemsPerPageChange }: UserTableHeaderProps) {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" m={2}>
      <Typography variant="h6">Lista de usuarios</Typography>
      <FormControl variant="outlined" size="small">
        <InputLabel id="items-per-page-label">Items per page</InputLabel>
        <Select
          labelId="items-per-page-label"
          id="items-per-page"
          value={itemsPerPage}
          onChange={onItemsPerPageChange}
          label="Items per page"
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default UserTableHeader;
