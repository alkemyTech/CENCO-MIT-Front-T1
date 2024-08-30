import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid, CardMedia, Box, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, TextField, AlertColor } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AppDispatch } from '../../redux/store';
import { loginUser, fetchUserProfile } from '../../redux/features/slices/authSlice';
import styles from './login.module.css';
import ColorButton from '../../components/ColorButton';
import { CustomAlert } from '../../components/CustomAlert';
import imgLogin from '../../assets/img/imgLogin.jfif';
import logo from '../../assets/img/Logo.png';
import { Role } from '../../interfaces/User';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [severity, setSeverity] = useState<AlertColor>("error");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate(); 

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
        const role = actionResult.payload.role;
  
        await dispatch(fetchUserProfile());
  
        setTimeout(() => {
          navigate(role === Role.ADMIN ? '/dashboard/all-users' : '/dashboard/profile'); 
        }, 1000); 
      } else {
        setSeverity('error');
      }
    } catch (error) {
      setSeverity('error');
    }
  };

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
              <FormControl variant="outlined" required fullWidth>
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
                  text={severity === "success" ? "Iniciaste sesión correctamente" : "Credenciales no válidas, inténtelo de nuevo"}
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
