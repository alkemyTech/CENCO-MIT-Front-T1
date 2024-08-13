import { Button, ButtonProps, styled } from "@mui/material";

const ColorButton = styled(Button)<ButtonProps>(() => ({
  backgroundColor: "#09BEFB",
  width: "100%",
  borderRadius: "16px",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#09BEFB",
  },
}));

export default ColorButton;
