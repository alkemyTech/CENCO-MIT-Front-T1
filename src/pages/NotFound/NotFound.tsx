import { Box, Container, Typography } from "@mui/material";
import ColorButton from "../../components/ColorButton";
import Notfound from "../../assets/img/notfound.png";
import Logo from "../../assets/img/Logo.png";

function NotFound() {
  return (
    <Container>
      <img width={200} src={Logo} alt="logo" />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          width={350}
          height="100vh"
          gap={2}
        >
          <img width={300} src={Notfound} alt="not found" />
          <Typography variant="h2" component="h2" color={"var(--text-color)"}>
            404
          </Typography>
          <Typography variant="h5" component="h5" color={"var(--text-color)"}>
            Page not found
          </Typography>
          <ColorButton variant="contained" href="/" size="large">
            Go to Home
          </ColorButton>
        </Box>
      </div>
    </Container>
  );
}

export default NotFound;
