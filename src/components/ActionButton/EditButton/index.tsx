import { Link } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

interface ActionButtonProps {
  userID: number;
}


export default function EditButton({ userID }: ActionButtonProps) {

  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <Link
      href={userID === user?.id ? `perfil` : `update/${userID}`}
      sx={{ color: "var(--text-color)" }}
      display={"block"}
      underline="hover"
      marginBlockEnd={1}
    >
      Edit
    </Link>
  );
}
