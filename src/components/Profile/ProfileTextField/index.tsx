import { TextField, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface ProfileTextFieldProps {
  id: string;
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  select?: boolean;
  children?: ReactNode;
  autoComplete?: string;
  type?: string;
  error?: boolean;  
  helperText?: string; 
  placeholder?: string; 
}

const ProfileTextField = ({
  id,
  label,
  name,
  value = "",
  onChange,
  disabled,
  select,
  children,
  autoComplete,
  type,
  error = false,
  helperText = "",
  placeholder = "",  
}: ProfileTextFieldProps) => (
  <>
    <Typography variant="body1" gutterBottom>
      {label}
    </Typography>
    <TextField
      fullWidth
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      select={select}
      autoComplete={autoComplete}
      type={type}
      error={error}  
      helperText={helperText}  
      placeholder={placeholder}  
      sx={{ borderRadius: '10px', '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
    >
      {children}
    </TextField>
  </>
);

export default ProfileTextField;
