import Grid from '@mui/material/Grid';
import imgLogin from '../../../assets/imgLogin.jfif';
import { Box, Button, CardMedia, TextField } from '@mui/material';
import './style.css';
import logo from '../../../assets/Logo.png'

function Login() {
  return (
    <Grid container className='container'>
      <Grid item sm={7} md={8} lg={8}>
        <CardMedia
          component="img"
          className='imgLogin'
          image={imgLogin}
          alt="Welcome"
        />
      </Grid>
      <Grid item sm={4} md={4} lg={4} className='loginForm'>
          <img src={logo} alt="Logo" className="logo" />
        <div className='formContainer'>
          <span className='textCenter titulo'>Hola, bienvenido a AlkeTalent</span>
          <span className='textCenter subtitulo'>Ingrese sus datos para iniciar sesión en su cuenta</span>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { my: 2 },
              '& .MuiButton-root': { my: 2 }
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
              <TextField
                required
                fullWidth
                id="outlined-required"
                label="Contraseña"
              />
              <Button fullWidth variant="contained">Acceder</Button>

            </div>

          </Box>
        </div>
      </Grid>



    </Grid>
  );
}

export default Login;
