import { Box, Pagination } from '@mui/material';

interface UserTablePaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

function UserTablePagination({ totalPages, currentPage, onPageChange }: UserTablePaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
      <Pagination count={totalPages} page={currentPage} onChange={onPageChange} shape="rounded" />
    </Box>
  );
}

export default UserTablePagination;
