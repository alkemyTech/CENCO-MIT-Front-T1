import { TableRow, TableCell, Typography } from '@mui/material';
import { User } from '../../../interfaces/User';
import ActionButton from '../../ActionButton';
import styles from '../index.module.css';

interface UserTableRowProps {
  user: User;
}

function UserTableRow({ user }: UserTableRowProps) {
  const roleClass = user.role === "admin" ? styles.roleAdmin : styles.roleUser;
  const inactiveClass = user.deletedDate ? styles.inactiveUser : '';

  return (
    <TableRow className={`${styles.tableRow} ${inactiveClass}`}>
      <TableCell>
        <Typography variant="body1" sx={{ color: user.deletedDate ? '#a0a0a0' : 'inherit' }}>
          {user.name}
        </Typography>
        <Typography variant="body2" sx={{ color: user.deletedDate ? '#a0a0a0' : 'rgba(0, 0, 0, 0.6)' }}>
          {user.email}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography className={`${roleClass} ${inactiveClass}`}>
          {user.role}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography sx={{ color: user.deletedDate ? '#a0a0a0' : 'inherit' }}>
          {user.deletedDate ? "Inactive" : "Active"}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography sx={{ color: user.deletedDate ? '#a0a0a0' : 'inherit' }}>
          {new Date(user.createDate).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </Typography>
      </TableCell>
      <TableCell>
        <ActionButton userID={user.id}  />
      </TableCell>
    </TableRow>
  );
}

export default UserTableRow;
