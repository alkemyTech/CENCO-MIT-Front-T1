import Grid from '@mui/material/Grid';
import imgLogin from '../../../assets/imgLogin.jfif';
import { AlertColor, Box, Button, CardMedia, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import styles from './login.module.css';
import logo from '../../../assets/Logo.png'
import React, { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/features/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import ColorButton from '../../components/ColorButton';
import { CustomAlert } from '../../components/CustomAlert';

function Login() {
  // for password funcionality
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showAlert, setShowAlert] = useState(false);
  const [severity, setSeverity] = useState<AlertColor>("error");

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = async () => {
    try {
      const actionResult = await dispatch(loginUser({ email, password }));
      setShowAlert(true);
      if (loginUser.fulfilled.match(actionResult)) {
        setSeverity('success');
        setTimeout(() => {
          navigate('/dashboard'); 
        }, 1000); // Tiempo en milisegundos     
      } else {
        setSeverity('error');
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
    }
  }
  return (

    <Grid container className={styles.container}>
      <Grid item md={8} lg={8}>
        <CardMedia
          component="img"
          className={styles.imgLogin}
          image={imgLogin}
          alt="Welcome"
        />
      </Grid>
      <Grid item md={4} lg={4} className={styles.loginForm}>

        <img src={logo} alt="Logo" className={styles.logo} />
        <div className={styles.formContainer}>
          <span className={`${styles.textCenter} ${styles.title}`} >Hola, bienvenido a AlkeTalent</span>
          <span className={`${styles.textCenter} ${styles.subtitle}`}>Ingrese sus datos para iniciar sesión en su cuenta</span>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { my: 4 },
              '& .MuiButton-root': { my: 4 }
            }}
            noValidate
            autoComplete="off"
          >
            <div className={styles.inputsContainer}>
              <TextField
                required
                fullWidth
                id="outlined-required"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormControl variant="outlined" required
                fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              <ColorButton variant='contained' onClick={handleSubmit}>Acceder</ColorButton>
              {
                showAlert && <CustomAlert
                  severity={severity}
                  text={severity === "success" ? "Login successful" : "Invalid credentials, try again"}
                />
              }

            </div>
          </Box>
        </div>
      </Grid>
    </Grid>
  );
}

export default Login;
