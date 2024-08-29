import { useState, useEffect, useCallback } from "react";
import { Box, Grid, MenuItem } from "@mui/material";
import { User, Role } from "../../../interfaces/User";
import ColorButton from "../../ColorButton";
import ProfileTextField from "../ProfileTextField";
import ProfilePasswordField from "../ProfilePasswordField";
import { validateProfileForm } from "../../../utils/validateProfileForm";
import FormChangePassword from "../../../pages/FormChangePassword";
import { useDispatch } from "react-redux";
import { showConfirmation } from "../../../redux/features/slices/confirmationSlice";
import { useParams } from "react-router-dom";
import ConfirmationDialog from "../../Confirmation";
import { changePassword } from '../../../api/userServices';
import { showAlert, hideAlert } from '../../../redux/features/slices/alertSlice';

interface ProfileFormProps {
  user: Partial<User>;
  onSave: (updatedUser: Partial<User>) => void;
  isEditing: boolean;
}

const ProfileForm = ({ user, onSave, isEditing }: ProfileFormProps) => {
  const [formValues, setFormValues] = useState<Partial<User>>({ ...user });
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [, setConfirmationOpen] = useState(false);
  const [pendingPasswordChange, setPendingPasswordChange] = useState<{ currentPassword: string; newPassword: string } | null>(null);
  const { userID } = useParams<{ userID: string }>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEditing) {
      setFormValues(user);
    }
  }, [user, isEditing]);

  const validate = useCallback(() => {
    const newErrors = validateProfileForm(formValues);
    setErrors(newErrors);
  }, [formValues]);

  useEffect(() => {
    validate();
  }, [formValues, validate]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (Object.keys(errors).length === 0) {
      setConfirmationOpen(true);
      dispatch(showConfirmation());
    }
  };

  const handlePasswordChange = async (currentPassword: string, newPassword: string) => {
    setPendingPasswordChange({ currentPassword, newPassword });
    setConfirmationOpen(true);
    dispatch(showConfirmation());
  };

  const handleConfirm = async () => {
    if (pendingPasswordChange) {
      const { currentPassword, newPassword } = pendingPasswordChange;
      setPendingPasswordChange(null);
      try {
        const response = await changePassword(currentPassword, newPassword);
        if (response.statusCode === 200) {
          dispatch(showAlert({ severity: 'success', text: 'Contraseña cambiada con éxito' }));
        } else if (response.statusCode === 401) {
          dispatch(showAlert({ severity: 'error', text: 'La contraseña actual no coincide.' }));
        } else {
          dispatch(showAlert({ severity: 'error', text: 'Error al cambiar la contraseña' }));
        }
      } catch (error) {
        dispatch(showAlert({ severity: 'error', text: 'Error al cambiar la contraseña' }));
      }
      setOpenPasswordModal(false);
      setIsPasswordEditing(false);  // Restablecer el estado después de cambiar la contraseña
    } else {
      const updatedUser = { ...formValues };
      if (!isPasswordEditing) {
        onSave(updatedUser);
        dispatch(showAlert({ severity: 'success', text: 'Perfil actualizado con éxito' }));
      }
    }
    setConfirmationOpen(false);

    // Ocultar la alerta después de 3 segundos
    setTimeout(() => {
      dispatch(hideAlert());
    }, 3000);
  };

  const handlePasswordIconClick = () => {
    setIsPasswordEditing(true);
    setOpenPasswordModal(true);
  };

  const handlePasswordModalClose = () => {
    setOpenPasswordModal(false);
    setIsPasswordEditing(false);
  };

  return (
    <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <ProfileTextField
            id="name"
            label="Full Name"
            name="name"
            value={formValues.name || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
            autoComplete="name"
            error={!!errors.name}
            helperText={errors.name}
            placeholder="ej: Carla Figueroa"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ProfileTextField
            id="email"
            label="Email"
            name="email"
            value={formValues.email || ""}
            onChange={handleInputChange}
            disabled={userID ? !isEditing : user.role === Role.ADMIN ? !isEditing : true}
            autoComplete="email"
            placeholder="ej: carla@example.com"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ProfilePasswordField
            value="******"
            onChange={handleInputChange}
            onPasswordIconClick={handlePasswordIconClick}
            isPasswordEditing={isPasswordEditing}
            autoComplete="current-password"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ProfileTextField
            id="rut"
            label="Rut"
            name="rut"
            value={formValues.rut || ""}
            onChange={handleInputChange}
            disabled
            autoComplete="off"
            placeholder="Ej: 18.123.123-3"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ProfileTextField
            id="birthday"
            label="Birthday"
            name="birthday"
            type="date"
            value={formValues.birthday || ""}
            onChange={handleInputChange}
            disabled={userID ? true : !isEditing}
            autoComplete="bday"
            error={!!errors.birthday}
            helperText={errors.birthday}
            placeholder="Ej: 08-10-1995"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ProfileTextField
            id="phone"
            label="Phone"
            name="phone"
            value={formValues.phone || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
            autoComplete="tel"
            error={!!errors.phone}
            helperText={errors.phone}
            placeholder="Ej: +56912572545"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ProfileTextField
            id="country"
            label="Country"
            name="country"
            value={formValues.country || ""}
            onChange={handleInputChange}
            disabled={userID ? true : !isEditing}
            autoComplete="country-name"
            error={!!errors.country}
            helperText={errors.country}
            placeholder="Ej: Chile"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ProfileTextField
            id="role"
            label="Role"
            name="role"
            value={formValues.role || ""}
            onChange={handleInputChange}
            disabled={userID ? !isEditing : user.role === Role.ADMIN ? !isEditing : true}
            select
            autoComplete="off"
          >
            <MenuItem value={Role.ADMIN}>Admin</MenuItem>
            <MenuItem value={Role.USER}>User</MenuItem>
          </ProfileTextField>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <ColorButton
            type="submit"
            disabled={!isEditing}
            sx={{
              borderRadius: "16px",
              color: isEditing ? "white" : "var(--primary-color)",
              backgroundColor: isEditing ? "#09BEFB" : "#e0e0e0",
              padding: "10px 0",
              width: {
                xs: "100%",
                sm: "60%",
              },
            }}
          >
            Guardar Cambios
          </ColorButton>
        </Grid>
      </Grid>
      <FormChangePassword 
        open={openPasswordModal} 
        onClose={handlePasswordModalClose} 
        onSubmit={(currentPassword, newPassword) => handlePasswordChange(currentPassword, newPassword)} 
      />
      <ConfirmationDialog
        onConfirm={handleConfirm}
        onClose={() => setConfirmationOpen(false)} 
      />
    </Box>
  );
};

export default ProfileForm;
