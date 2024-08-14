import Grid from '@mui/material/Grid';
import imgLogin from '../../../assets/imgLogin.jfif';
import { Box, Button, CardMedia, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import './style.css';
import logo from '../../../assets/Logo.png'
import React, { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function Login() {
  // for password funcionality
  const [showPassword, setShowPassword] = useState(false)


  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (

    <Grid container className='container'>
      <Grid item md={8} lg={8}>
        <CardMedia
          component="img"
          className='imgLogin'
          image={imgLogin}
          alt="Welcome"
        />
      </Grid>
      <Grid item md={4} lg={4} className='loginForm' >
        <img src={logo} alt="Logo" className="logo" />
        <div className='formContainer'>
          <span className='textCenter title'>Hola, bienvenido a AlkeTalent</span>
          <span className='textCenter subtitle'>Ingrese sus datos para iniciar sesión en su cuenta</span>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { my: 4 },
              '& .MuiButton-root': { my: 4 }
            }}
            noValidate
            autoComplete="off"
          >
            <div className='inputsContainer'>
              <TextField
                required
                fullWidth
                id="outlined-required"
                label="Nombre de usuario"
              />
              <FormControl variant="outlined" required
                fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput

                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <Button fullWidth variant="contained">Acceder</Button>

            </div>
          </Box>
        </div>
      </Grid>
    </Grid>
  );
}

export default Login;
