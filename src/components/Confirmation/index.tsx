import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  hideConfirmation,
  setConfirmationStatus,
} from "../../redux/features/slices/confirmationSlice";

interface ConfirmationDialogProps {
  onConfirm: () => void;
  onClose: () => void
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  onConfirm,
}) => {
  const dispatch = useDispatch();
  const { open } = useSelector((state: RootState) => state.confirmation);

  const handleClosePopup = (response: boolean) => {
    dispatch(hideConfirmation());
    if (response) {
      dispatch(setConfirmationStatus(true));
      onConfirm();
    } else {
      dispatch(setConfirmationStatus(false));
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => handleClosePopup(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"¿Desea proceder con los cambios?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Por favor, confirme si desea proceder con los cambios.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClosePopup(false)}>Cancelar</Button>
        <Button onClick={() => handleClosePopup(true)}>Confirmar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
