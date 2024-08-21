import { useState, useEffect, useCallback } from "react";
import { Box, Grid, MenuItem } from "@mui/material";
import { User, Role } from "../../../interfaces/User";
import ColorButton from "../../ColorButton";
import ProfileTextField from "../ProfileTextField";
import ProfilePasswordField from "../ProfilePasswordField";
import { validateProfileForm } from "../../../utils/validateProfileForm";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

interface ProfileFormProps {
  user: Partial<User>;
  onSave: (updatedUser: Partial<User>) => void;
  isEditing: boolean;
}

const ProfileForm = ({ user, onSave, isEditing }: ProfileFormProps) => {
  const [formValues, setFormValues] = useState<Partial<User>>({ ...user });
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { userID } = useParams<{ userID: string }>();
  let isUserId = false;

  if(userID){
    isUserId = true;
  }

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
      const updatedUser = { ...formValues };

      if (!isPasswordEditing) {
        delete updatedUser.password;
      }

      onSave(updatedUser);
    }
  };

  const handlePasswordIconClick = () => {
    if (!userID) {
      setIsPasswordEditing(true);
    }
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
            placeholder="Enter your full name"  // Placeholder
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ProfileTextField
            id="email"
            label="Email"
            name="email"
            value={formValues.email || ""}
            onChange={handleInputChange}
            disabled= {userID ? !isEditing : true}
            autoComplete="email"
            placeholder="ej: carla@example.com"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ProfilePasswordField
            value="********"
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
            disabled= {userID ? true : !isEditing}
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
            disabled= {userID ? true : !isEditing}
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
            disabled= {userID ? !isEditing : true}
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
    </Box>
  );
};

export default ProfileForm;
