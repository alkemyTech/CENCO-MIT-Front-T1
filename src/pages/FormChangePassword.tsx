import React, { useState, useEffect } from 'react';
import { Modal, Typography, TextField, Grid, Button } from '@mui/material';
import { changePassword } from '../api/userServices';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { isPasswordValid } from '../validations/changePassword';
import ColorButton from '../components/ColorButton';

interface FormChangePasswordProps {
  open: boolean;
  onClose: () => void;
}

const passwordsMatch = (newPassword: string, confirmPassword: string) => newPassword === confirmPassword;

    


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

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
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

    // Validate field on change
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Validate all fields before submission
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
        // Asumiendo que ya validaste los campos antes de este bloque de código
        const response = await changePassword(formData.currentPassword, formData.newPassword);
        console.log(response.statusCode, response.message);
      
        switch (response.statusCode) {
          case 401:
            alert('La contraseña actual no coincide.');
            break;
          case 200:
            alert('Contraseña cambiada con éxito');
            break;
          case 422: // Asumiendo que 422 es el código de estado para errores de validación
            alert('Error de validación. Por favor, revisa los campos.');
            break;
          default:
            alert('Error desconocido al cambiar la contraseña');
            break;
        }
      } catch (error) {
        console.error('Error al cambiar la contraseña:', error);
        alert('Error al cambiar la contraseña');
        }
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
    
  };

  const handleCancel = () => {
    onClose();
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
      <div style={{ backgroundColor: 'white', padding: '40px', maxWidth: '600px', width: '100%', borderRadius: '10px'}}>
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