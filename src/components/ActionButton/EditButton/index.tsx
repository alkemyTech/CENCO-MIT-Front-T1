import { Link } from "@mui/material";

interface ActionButtonProps {
  userID: number;
}

export default function EditButton({ }: ActionButtonProps) {
  return (
    <Link
      href="#"
      sx={{ color: "var(--text-color)" }}
      display={"block"}
      underline="hover"
      marginBlockEnd={1}
    >
      Edit
    </Link>
  );
}
