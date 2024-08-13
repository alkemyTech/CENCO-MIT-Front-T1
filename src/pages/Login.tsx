import Grid from '@mui/material/Grid';
import imgLogin from '../../assets/imgLogin.jfif';
import { Box, Button, CardMedia, TextField } from '@mui/material';
import '../../assets/styles/global.css';
import logo from '../../assets/Logo.png'

function Login() {
  return (
    <Grid container sx={{ display: 'flex', padding: 0, margin: 0 }}>
      <Grid item xs={8}>
        <CardMedia
          component="img"
          sx={{ maxWidth: 'auto', maxHeight: '100vh' }}
          image={imgLogin}
          alt="Welcome"
        />
      </Grid>
      <Grid style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <img src={logo} alt='logo' style={{ marginBottom: '16px' }} />
        <div style={{ textAlign: 'center' }}>
          <h6>Hola, bienvenido a AlkeTalent</h6>
          <p>Ingrese sus datos para iniciar sesión en su cuenta</p>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1 },
              '& .MuiButton-root': { m: 1 }
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                required
                fullWidth
                id="outlined-required"
                label="Required"
                defaultValue="Hello World"
              />
              <TextField
                disabled
                fullWidth
                id="outlined-disabled"
                label="Disabled"
                defaultValue="Hello World"
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
