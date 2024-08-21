import * as React from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import ColorButton from "../components/ColorButton";
import ColorBox from "../components/Box";
import { signup } from "../api/userServices";
import { isRutValid } from "../validations/rutValidation";
import { isPhoneValid } from "../validations/phoneValidation";
import { isPasswordValid } from "../validations/passwordValidation";
import { isEmailValidAndAvailable } from "../validations";
import { isBirthdayValidAndAdult } from "../validations/birthdayValidation";
import { Role } from "../interfaces/User";

const Register = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const [formData, setFormData] = useState({
    name: "",
    rut: "",
    email: "",
    phone: "",
    country: "",
    birthday: new Date(),
    role: "user" as Role,
    password: "",
  });

  const [errors, setErrors] = useState({
    rut: "",
    phone: false,
    password: false,
    confirmPassword: false,
    email: "",
    birthday: false,
    role: false, // Add the 'role' property
  });

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"; // Prevent scrolling on body when modal is open
    } else {
      document.body.style.overflow = ""; // Re-enable scrolling on body when modal is closed
    }

    return () => {
      document.body.style.overflow = ""; // Clean up in case the component is unmounted
    };
  }, [open]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validations
    if (name === "rut") {
      const { valid, available } = await isRutValid(value);
      setErrors({
        ...errors,
        rut: !valid ? "Rut inválido" : !available ? "Rut ya está en uso" : "",
      });
    } else if (name === "phone")
      setErrors({ ...errors, phone: !isPhoneValid(value) });
    else if (name === "password")
      setErrors({ ...errors, password: !isPasswordValid(value) });
    else if (name === "birthday")
      setErrors({ ...errors, birthday: !isBirthdayValidAndAdult(value) });
    else if (name === "confirmPassword")
      setErrors({ ...errors, confirmPassword: formData.password !== value });
    else if (name === "role") {
      setFormData({ ...formData, role: value });
    }
    else if (name === "email") {
      const { valid, available } = await isEmailValidAndAvailable(value);
      setErrors({
        ...errors,
        email: !valid
          ? "Correo inválido"
          : !available
          ? "Correo ya está en uso"
          : "",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verificar errores antes de enviar
    if (Object.values(errors).some((error) => error)) {
      alert("Por favor, corrija los errores antes de enviar.");
      return;
    }

    try {
      await signup(formData);
      console.log("eliminadnod");
      sessionStorage.setItem("createStatus", "success");
    } catch (error) {
      console.error("Error deleting user:", error);
      sessionStorage.setItem("createStatus", "error");
    } finally {
      handleClose();
      window.location.reload();
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ColorBox
        sx={{
          bgcolor: "white",
          padding: "20px",
          maxWidth: 600,
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ fontWeight: "bold" }}
        >
          Agregar usuario
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormLabel htmlFor="name" sx={{ fontWeight: "bold" }}>
                Nombre Completo
              </FormLabel>
              <TextField
                margin="dense"
                required
                fullWidth
                id="name"
                label="Ejemplo: Juan Pérez"
                name="name"
                autoComplete="name"
                autoFocus
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel htmlFor="email" sx={{ fontWeight: "bold" }}>
                Correo Electrónico
              </FormLabel>
              <TextField
                error={!!errors.email}
                helperText={errors.email}
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel htmlFor="rut" sx={{ fontWeight: "bold" }}>
                Rut
              </FormLabel>
              <TextField
                error={!!errors.rut}
                helperText={errors.rut}
                margin="dense"
                required
                fullWidth
                id="rut"
                label="Ejemplo: 12.345.678-9"
                name="rut"
                autoComplete="rut"
                value={formData.rut}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel htmlFor="phone" sx={{ fontWeight: "bold" }}>
                Teléfono
              </FormLabel>
              <TextField
                error={errors.phone}
                helperText={errors.phone ? "Teléfono inválido" : ""}
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
              <FormLabel htmlFor="country" sx={{ fontWeight: "bold" }}>
                País
              </FormLabel>
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
              <FormLabel htmlFor="birthday" sx={{ fontWeight: "bold" }}>
                Fecha de Nacimiento
              </FormLabel>
              <TextField
                error={errors.birthday}
                helperText={
                  errors.birthday ? "Fecha de nacimiento inválida" : ""
                }
                margin="dense"
                required
                fullWidth
                id="birthday"
                label="Fecha de Nacimiento"
                name="birthday"
                type="date"
                defaultValue=""
                InputLabelProps={{
                  shrink: true,
                }}
                value={formData.birthday ? formData.birthday : ""}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel htmlFor="role" sx={{ fontWeight: "bold" }}>
                Rol
              </FormLabel>
              <FormControl fullWidth margin="dense">
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  eroor={errors.role}
                  type="role"
                  labelId="role-label"
                  id="role"
                  value={formData.role}
                  label="Role"
                  name="role"
                  onChange={handleChange}
                >
                  <MenuItem value={"user"}>User</MenuItem>
                  <MenuItem value={"admin"}>Admin</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel htmlFor="password" sx={{ fontWeight: "bold" }}>
                Contraseña
              </FormLabel>
              <TextField
                error={errors.password}
                helperText={errors.password ? "Contraseña inválida" : ""}
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
          </Grid>

          <ColorButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Registrar
          </ColorButton>
        </form>
      </ColorBox>
    </Modal>
  );
};

export default Register;
