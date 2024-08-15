import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Form } from 'react-router-dom';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';
import AdapterDateFns from '@mui/x-date-pickers';
import LocalizationProvider from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers';
import axios from 'axios';
import { Grid } from '@mui/material';



const style = {
    position: 'absolute',
    top: '50%', // Centrar verticalmente
    left: '50%', // Centrar horizontalmente
    transform: 'translate(-50%, -50%)', // Ajustar el centro exacto del modal
    width: '599px', // Ancho fijo
    height: '735px', // Alto fijo
    bgcolor: 'background.paper',
    border: '2px solid transparent',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
    borderRadius: '30px'
  };
  

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
        try {
          const response = await axios.post('http://localhost:3000/user/signup', formData);
          // Asumiendo que el backend responde con un mensaje en caso de éxito
          postMessage(response.data.message);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            // Manejar errores específicos de la respuesta del backend
            postMessage(error.response?.data.message || 'An error occurred');
          } else {
            // Manejar otros errores
            postMessage('An error occurred');
          }
        }
      };
  
      return (
        <div>
          <Button onClick={handleOpen}>Agregar usuario</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Register
              </Typography>
              <form onSubmit={handleSubmit}>
                
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="fullName"
                      label="Full Name"
                      name="fullName"
                      autoComplete="name"
                      autoFocus
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  
                 
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  
                  
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="rut"
                      label="RUT"
                      name="rut"
                      autoComplete="rut"
                      value={formData.rut}
                      onChange={handleChange}
                    />
                  
                  <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="phone"
                      label="Phone Number"
                      name="phone"
                      autoComplete="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="country"
                      label="Country"
                      name="country"
                      autoComplete="country"
                      value={formData.country}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="birthday"
                      label="Birthday"
                      name="birthday"
                      autoComplete="birthday"
                      value={formData.birthday}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth margin="normal">
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
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      id="confirmPassword"
                      autoComplete="current-password"
                     />
                    </Grid>
                </Grid>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, backgroundColor: '#09BEFB' }}>
                  Registro
                </Button>
              </form>
            </Box>
          </Modal>
        </div>
      );
    }

export default Register; // Export the Register component
             