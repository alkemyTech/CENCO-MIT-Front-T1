import {
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Tooltip,
} from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";

interface ProfilePasswordFieldProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordIconClick: () => void;
  isPasswordEditing: boolean;
  autoComplete?: string;
}

const ProfilePasswordField = ({
  value,
  onChange,
  onPasswordIconClick,
  isPasswordEditing,
  autoComplete,
}: ProfilePasswordFieldProps) => (
  <>
    <Typography variant="body1" gutterBottom>
      Password
    </Typography>
    <TextField
      fullWidth
      name="password"
      type="password"
      value={value}
      onChange={onChange}
      disabled={!isPasswordEditing}
      autoComplete={autoComplete}
      InputProps={{
        readOnly: !isPasswordEditing,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={onPasswordIconClick}>
              <Tooltip title="Haz clic para editar tu contraseña">
                <EditIcon />
              </Tooltip>
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{
        borderRadius: "10px",
        "& .MuiOutlinedInput-root": { borderRadius: "10px" },
      }}
    />
  </>
);

export default ProfilePasswordField;
