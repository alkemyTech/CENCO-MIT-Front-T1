import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  TableContainer,
  Table,
  Paper,
  Box,
  Typography,
  SelectChangeEvent,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
} from "@mui/material";
import { fetchUsers } from "../../redux/features/slices/userSlice";
import UserTableHeader from "./UserTableHeader";
import UserTablePagination from "./UserTablePagination";
import RenderList from "./RenderList";
import LoadingView from "./LoadingView";
import styles from "./index.module.css";
import { User } from "../../interfaces/User";

interface UserTableProps {
  sortOrder: "asc" | "desc";
  filterStatus: "" | "active" | "inactive";
}

const UserTable = ({ sortOrder, filterStatus }: UserTableProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = filterAndSortUsers(users, filterStatus, sortOrder);
  const currentUsers = paginateUsers(filteredUsers, currentPage, itemsPerPage);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleItemsPerPageChange = (event: SelectChangeEvent<number>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  if (loading)
    return (
      <LoadingView
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    );

  return (
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
          onItemsPerPageChange={handleItemsPerPageChange}
        />
        <Table className={styles.table}>
          <TableHead>
            <TableRow sx={{ background: "rgba(228, 241, 255, 0.8)", '& .MuiTableCell-root': { fontWeight: 'bold' } }}>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>status</TableCell>
              <TableCell>Create Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {error ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Box
                    sx={{
                      textAlign: "center",
                      color: "var(--text-color)",
                      padding: 3,
                    }}
                  >
                    <Typography variant="h6" component="div">
                      No se encontraron usuarios
                    </Typography>
                    <Typography variant="body2" component="div" sx={{ marginTop: 1 }}>
                      ingresa un correo electrónico con formato de correo correcto ej: 
                      <Typography variant="body2" component="span" sx={{ fontWeight: 'bold' }}>
                        &nbsp;carla@example.com
                      </Typography>
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : currentUsers.length > 0 ? (
              <RenderList users={currentUsers} />
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="h6">
                    No se encontraron usuarios.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <UserTablePagination
        totalPages={Math.ceil(filteredUsers.length / itemsPerPage)}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </Box>
  );
};

export default UserTable;

const filterAndSortUsers = (
  users: User[],
  filterStatus: "" | "active" | "inactive",
  sortOrder: "asc" | "desc"
): User[] => {
  let filteredUsers = [...users];

  if (filterStatus) {
    filteredUsers = filteredUsers.filter((user) =>
      filterStatus === "active" ? !user.deletedDate : user.deletedDate
    );
  }

  if (sortOrder) {
    filteredUsers.sort((a, b) => {
      const dateA = new Date(a.createDate).getTime();
      const dateB = new Date(b.createDate).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
  }

  return filteredUsers;
};

const paginateUsers = (
  filteredUsers: User[],
  currentPage: number,
  itemsPerPage: number
): User[] => {
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  return filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
};