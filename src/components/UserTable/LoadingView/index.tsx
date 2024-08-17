import { Box, TableContainer, Paper, Table, TableBody, TableRow, TableCell } from "@mui/material";
import LoadingSpinner from "../../LoadingSpinner";
import UserTableHeader from "../UserTableHeader";
import styles from "../index.module.css";
import { SelectChangeEvent } from "@mui/material";

const LoadingView = ({
  itemsPerPage,
  onItemsPerPageChange,
}: {
  itemsPerPage: number;
  onItemsPerPageChange: (event: SelectChangeEvent<number>) => void;
}) => (
  <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
    <TableContainer
      component={Paper}
      className={styles.tableContainer}
      sx={{
        boxShadow: "0px 0px 27px -23px rgba(0,0,0,0.75)",
        borderRadius: "30px",
        flexGrow: 1,
        overflowY: "auto",
      }}
    >
      <UserTableHeader
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
      />
      <Table className={styles.table}>
        <TableBody>
          <TableRow>
            <TableCell colSpan={6} align="center">
              <LoadingSpinner centered size={50} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
);

export default LoadingView;
