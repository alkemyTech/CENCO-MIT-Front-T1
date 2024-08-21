import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { hideConfirmation, setConfirmationStatus } from "../../redux/features/slices/confirmationSlice";

interface ConfirmationDialogProps {
    onConfirm: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ onConfirm }) => {
    const dispatch = useDispatch();
    const { open } = useSelector((state: RootState) => state.confirmation);

    const handleClosePopup = (response: boolean) => {
        dispatch(hideConfirmation());
        if (response) {
            dispatch(setConfirmationStatus(true));
            onConfirm();
        } else {
            dispatch(setConfirmationStatus(false));
            window.location.reload();
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
                {"¿Do you want to proceed with the changes?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Please confirm if you want to proceed with the changes.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClosePopup(false)}>Cancel</Button>
                <Button onClick={() => handleClosePopup(true)} >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;
