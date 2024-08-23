import React, { useState, useEffect } from 'react';
import { Modal, Typography, TextField, Grid } from '@mui/material';
import { changePassword } from '../api/userServices';
import { useDispatch } from 'react-redux';
import { showAlert, hideAlert } from '../redux/features/slices/alertSlice';
import { isPasswordValid } from '../validations/changePassword';
import ColorButton from '../components/ColorButton';

interface FormChangePasswordProps {
  open: boolean;
  onClose: () => void;
}

const FormChangePassword: React.FC<FormChangePasswordProps> = ({ open, onClose }) => {
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

  const dispatch = useDispatch();

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

  const handleSubmit = async (e: React.FormEvent) => {
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

    try {
      const response = await changePassword(formData.currentPassword, formData.newPassword);

      switch (response.statusCode) {
        case 401:
          dispatch(showAlert({ severity: 'error', text: 'La contraseña actual no coincide.' }));
          break;
        case 200:
          dispatch(showAlert({ severity: 'success', text: 'Contraseña cambiada con éxito' }));
          break;
        case 422:
          dispatch(showAlert({ severity: 'error', text: 'Error de validación. Por favor, revisa los campos.' }));
          break;
        default:
          dispatch(showAlert({ severity: 'error', text: 'Error desconocido al cambiar la contraseña' }));
          break;
      }
      setTimeout(() => {
        dispatch(hideAlert());
      }, 3000);
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      dispatch(showAlert({ severity: 'error', text: 'Error al cambiar la contraseña' }));
      
      setTimeout(() => {
        dispatch(hideAlert());
      }, 3000);
    }

    onClose();
  };

  const handleClose = () => {
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
    onClose(); 
  };

  const handleCancel = () => {
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
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
          <ColorButton onClick={handleCancel} fullWidth variant="contained" sx={{ mt: 3 }}>
            Cancelar
          </ColorButton>
        </form>
      </div>
    </Modal>
  );
};

export default FormChangePassword;
