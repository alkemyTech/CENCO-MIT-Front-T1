import { Alert, AlertColor } from "@mui/material";

interface CustomAlertProps {
  severity: AlertColor;
  text: string;
}

function CustomAlertProps({ severity, text }: Readonly<CustomAlertProps>) {
  return <Alert severity={severity}>{text}</Alert>;
}
