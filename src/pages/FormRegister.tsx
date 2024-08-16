import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormControl, FormLabel, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';
import { Grid } from '@mui/material';
import ColorButton from '../components/ColorButton';
import ColorBox from '../components/Box';
import { signup } from '../api/api';
  

  const Register = () => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
      fullName: '',
      rut: '',
      email: '',
      phone: '',
      country: '',
      birthday: '',
        role: '',
      password: '',
    });
  
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await signup(formData);
        postMessage(result.message); // Assuming postMessage is a function to display messages to the user
      };
  
      return (
        <div>
          <Button onClick={handleOpen} >Agregar usuario</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <ColorBox sx={{ bgcolor: 'white', padding: '20px' }}>
              <Typography id="modal-modal-title" variant="h6" component="h2"  sx={{ fontWeight: 'bold' }}>
                Agregar usuario
              </Typography>
              <form onSubmit={handleSubmit}>
                 <FormLabel htmlFor="fullName"sx={{ fontWeight: 'bold' }}>Nombre Completo</FormLabel>
                    <TextField
                      margin="dense"
                      required
                      fullWidth
                      id="fullName"
                      label="Ejemplo: Juan Pérez"
                      name="fullName"
                      autoComplete="name"
                      autoFocus
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  
                    <FormLabel htmlFor="email"sx={{ fontWeight: 'bold' }}>Correo Electrónico</FormLabel>
                    <TextField
                      margin="dense"
                      required
                      fullWidth
                      id="email"
                      label="Ejemplo: Juan@gmail.com"
                      name="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  
                    <FormLabel htmlFor="rut"sx={{ fontWeight: 'bold' }}>Rut</FormLabel>
                    <TextField
                      margin="dense"
                      required
                      fullWidth
                      id="rut"
                      label="Ejemplo: 12345678-9"
                      name="rut"
                      autoComplete="rut"
                      value={formData.rut}
                      onChange={handleChange}
                    />

                   
                  <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                  <FormLabel htmlFor="phone"sx={{ fontWeight: 'bold' }}>Telefono</FormLabel>
                    <TextField
                      margin="dense"
                      required
                      fullWidth
                      id="phone"
                      label="Ejemplo: +56912345XXX"
                      name="phone"
                      autoComplete="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <FormLabel htmlFor="country"sx={{ fontWeight: 'bold' }}>País</FormLabel>
                    <TextField
                      margin="dense"
                      required
                      fullWidth
                      id="country"
                      label="Ejemplo: Chile"
                      name="country"
                      autoComplete="country"
                      value={formData.country}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormLabel htmlFor="birthday"sx={{ fontWeight: 'bold' }}>Fecha de Nacimiento</FormLabel>
                    <TextField
                      margin="dense"
                      required
                      fullWidth
                      id="birthday"
                      label="Ejemplo: 01/01/2000"
                      name="birthday"
                      autoComplete="birthday"
                      value={formData.birthday}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <FormLabel htmlFor="role"sx={{ fontWeight: 'bold' }}>Rol</FormLabel>
                    <FormControl fullWidth margin="dense">
                      <InputLabel id="role-label">Role</InputLabel>
                      <Select
                        labelId="role-label"
                        id="role"
                        value={formData.role}
                        label="Role"
                        name="role"
                        onChange={handleChange}
                      >
                        <MenuItem value={'User'}>User</MenuItem>
                        <MenuItem value={'Admin'}>Admin</MenuItem>
                        {/* Agrega más roles según sea necesario */}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormLabel htmlFor="Password"sx={{ fontWeight: 'bold' }} >Contraseña</FormLabel>
                    <TextField
                      margin="dense"
                      required
                      fullWidth
                      name="password"
                      label="*******"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      value={formData.password}
                      onChange={handleChange}
                      
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormLabel htmlFor="confirmPassword"sx={{ fontWeight: 'bold' }}>Confirmar Contraseña</FormLabel>
                  <TextField
                      margin="dense"
                      required
                      fullWidth
                      name="confirmPassword"
                      label="*******"
                      type="password"
                      id="confirmPassword"
                      autoComplete="current-password"
                     />
                    </Grid>
                </Grid>

                <ColorButton type="submit" fullWidth variant="contained"  sx={{mt: 3, mb:2 }}>
                    Registrar
                </ColorButton>

              </form>
            </ColorBox>
          </Modal>
        </div>
      );
    }

export default Register; // Export the Register component
             