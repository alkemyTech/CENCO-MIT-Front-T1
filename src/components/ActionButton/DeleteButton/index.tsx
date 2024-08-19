import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
} from "@mui/material";
import { grey, red } from "@mui/material/colors";
import { useState } from "react";
import { deleteUser } from "../../../api/userServices";

interface ActionButtonProps {
  userID: number;
  disabled: boolean;
}

export default function DeleteButton({
  userID,
  disabled,
}: Readonly<ActionButtonProps>) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    if (!disabled) {
      setOpen(true);
    }
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
        sx={{
          color: disabled ? grey[500] : red[500],
          textDecoration: disabled ? "none" : "underline",
          cursor: disabled ? "not-allowed" : "pointer",
        }}
        underline={disabled ? "none" : "hover"}
        disabled={disabled}
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
