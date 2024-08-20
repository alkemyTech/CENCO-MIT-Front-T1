import { Box, IconButton, Divider, Typography,Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";


interface ProfileHeaderProps {
  onEdit: () => void;
}

const ProfileHeader = ({ onEdit }: ProfileHeaderProps) => {
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Datos personales
        </Typography>
        <Tooltip title="Haz clic para editar tu perfil">
            <IconButton onClick={onEdit}>
              <EditIcon />
            </IconButton>
          </Tooltip>
      </Box>
      <Divider />
    </>
  );
};

export default ProfileHeader;
