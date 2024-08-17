import { Drawer, useTheme, useMediaQuery, Box } from '@mui/material';
import SidebarContent from './SidebarContent';
import Logo from '../../assets/img/Logo.png';

const Sidebar = ({ open, onDrawerToggle }: { open: boolean, onDrawerToggle: () => void }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={open}
        onClose={onDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: '100%',
            maxWidth: '250px',
          },
        }}
      >
        <Box sx={{ padding: '20px' }}>
        <img width={140} src={Logo} alt="logo" />
        </Box>
        <SidebarContent isMobile={isMobile} onLinkClick={onDrawerToggle} />
      </Drawer>
  );
};

export default Sidebar;
