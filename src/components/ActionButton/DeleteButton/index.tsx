import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { useState } from "react";
import { deleteUser } from "../../../api/userServices";
import { CustomAlert } from "../../CustomAlert";

interface ActionButtonProps {
  userID: number;
}

export default function DeleteButton({ userID }: Readonly<ActionButtonProps>) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    try {
      await deleteUser(userID);
      console.log("eliminadnod");
      sessionStorage.setItem("deleteStatus", "success");
    } catch (error) {
      console.error("Error deleting user:", error);
      sessionStorage.setItem("deleteStatus", "error");
    } finally {
      setOpen(false);
      window.location.reload();
    }
  };

  return (
    <>
      <Link
        href="#"
        onClick={handleClickOpen}
        sx={{ color: red[500] }}
        underline="hover"
      >
        Delete
      </Link>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this user?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Once a user is deleted, they become inactive and can no longer log
            in to their account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleConfirm}
            variant="contained"
            color="error"
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
