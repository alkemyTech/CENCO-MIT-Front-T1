import { useState } from "react";
import { Box, Grid, MenuItem } from "@mui/material";
import { User, Role } from "../../../interfaces/User";
import ColorButton from "../../ColorButton";
import ProfileTextField from "../ProfileTextField";
import ProfilePasswordField from "../ProfilePasswordField";

interface ProfileFormProps {
  user: User;
  onSave: (updatedUser: User) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

const ProfileForm = ({
  user,
  onSave,
  isEditing,
  setIsEditing,
}: ProfileFormProps) => {
  const [formValues, setFormValues] = useState<User>({ ...user });
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (isEditing) {
      onSave(formValues);
      setIsEditing(false);
    }
  };

  const handlePasswordIconClick = () => {
    setIsPasswordEditing(true);
  };

  return (
    <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <ProfileTextField
            id="name"
            label="Full Name"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            disabled={!isEditing}
            autoComplete="name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ProfileTextField
            id="email"
            label="Email"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
            disabled
            autoComplete="email"
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
            value={formValues.rut}
            onChange={handleInputChange}
            disabled
            autoComplete="off"
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
            disabled={!isEditing}
            autoComplete="bday"
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
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ProfileTextField
            id="country"
            label="Country"
            name="country"
            value={formValues.country || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
            autoComplete="country-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ProfileTextField
            id="role"
            label="Role"
            name="role"
            value={formValues.role}
            onChange={handleInputChange}
            disabled
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
