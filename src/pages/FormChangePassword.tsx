import React, { useState, useEffect } from 'react';
import { Modal, Typography, TextField, Grid } from '@mui/material';
import { isPasswordValid } from '../validations/changePassword';
import ColorButton from '../components/ColorButton';

interface FormChangePasswordProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (currentPassword: string, newPassword: string) => void; // Nueva prop para manejar el submit
}

const FormChangePassword: React.FC<FormChangePasswordProps> = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (!open) {
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setErrors({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }
  }, [open]);

  const validateField = (name: string, value: string) => {
    let error = '';

    if (name === 'currentPassword') {
      if (!value) {
        error = 'Contraseña requerida.';
      }
    }

    if (name === 'newPassword') {
      if (!value) {
        error = 'Nueva contraseña requerida.';
      } else if (!isPasswordValid(value)) {
        error = 'La contraseña debe tener al menos 8 caracteres, incluir al menos una letra mayúscula y un símbolo.';
      }
    }

    if (name === 'confirmPassword') {
      if (!value) {
        error = 'Por favor confirme la contraseña.';
      } else if (value !== formData.newPassword) {
        error = 'Contraseñas no coinciden.';
      }
    }

    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentPasswordError = validateField('currentPassword', formData.currentPassword);
    const newPasswordError = validateField('newPassword', formData.newPassword);
    const confirmPasswordError = validateField('confirmPassword', formData.confirmPassword);

    if (currentPasswordError || newPasswordError || confirmPasswordError) {
      setErrors({
        currentPassword: currentPasswordError,
        newPassword: newPasswordError,
        confirmPassword: confirmPasswordError,
      });
      return;
    }

    onSubmit(formData.currentPassword, formData.newPassword); // Llama a la función onSubmit para manejar el cambio de contraseña
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="change-password-modal-title"
      aria-describedby="change-password-modal-description"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ backgroundColor: 'white', padding: '40px', maxWidth: '600px', width: '100%', borderRadius: '10px' }}>
        <Typography id="change-password-modal-title" variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
          Cambiar Contraseña
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                error={!!errors.currentPassword}
                helperText={errors.currentPassword}
                margin="dense"
                required
                fullWidth
                name="currentPassword"
                label="Contraseña Actual"
                type="password"
                value={formData.currentPassword}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!errors.newPassword}
                helperText={errors.newPassword}
                margin="dense"
                required
                fullWidth
                name="newPassword"
                label="Nueva Contraseña"
                type="password"
                value={formData.newPassword}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                margin="dense"
                required
                fullWidth
                name="confirmPassword"
                label="Confirmar Nueva Contraseña"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <ColorButton type="submit" fullWidth variant="contained" sx={{ mt: 3 }} disabled={!isPasswordValid(formData.confirmPassword)}>
            Guardar
          </ColorButton>
          <ColorButton onClick={onClose} fullWidth variant="contained" sx={{ mt: 3 }}>
            Cancelar
          </ColorButton>
        </form>
      </div>
    </Modal>
  );
};

export default FormChangePassword;
