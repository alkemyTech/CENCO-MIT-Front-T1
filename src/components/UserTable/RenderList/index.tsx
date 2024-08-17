import { TableRow, TableCell, Typography } from "@mui/material";
import UserTableRow from "../UserTableRow";
import { User } from "../../../interfaces/User";

interface RenderListProps {
  users: User[];
}

const RenderList = ({ users }: RenderListProps) => {
  if (users.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={6} align="center">
          <Typography variant="h6">No se encontraron usuarios.</Typography>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {users.map((user) => (
        <UserTableRow key={user.id} user={user} />
      ))}
    </>
  );
};

export default RenderList;
