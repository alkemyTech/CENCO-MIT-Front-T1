import { Alert, AlertColor } from "@mui/material";

interface CustomAlertProps {
  severity: AlertColor;
  text: string;
}

export function CustomAlert({ severity, text }: Readonly<CustomAlertProps>) {
  return <Alert severity={severity}>{text}</Alert>;
}
