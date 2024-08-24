import { useEffect, useState } from 'react';
import { List, Box } from '@mui/material';
import { useLocation } from 'react-router-dom'; // Importa useLocation
import SidebarItem from '../SidebarItem';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useSelector } from 'react-redux';
import { SidebarContentProps } from '../../../interfaces/SidebarInterfaces';
import { RootState } from '../../../redux/store';
import { Role } from '../../../interfaces/User';

const SidebarContent = ({ isMobile, onLinkClick }: SidebarContentProps) => {
  const location = useLocation(); // Obtener la ubicación actual
  const { role } = useSelector((state: RootState) => state.auth);
  const [activeItem, setActiveItem] = useState('Dashboard');

  useEffect(() => {
    // Determina el ítem activo en función de la URL actual
    if (location.pathname.includes('/dashboard')) {
      setActiveItem('Dashboard');
    } else if (location.pathname.includes('/perfil')) {
      setActiveItem('Profile');
    }
  }, [location]);

  const handleItemClick = (item: string) => {
    setActiveItem(item);
    if (isMobile) {
      onLinkClick();
    }
  };

  return (
    <List>
      {role === Role.ADMIN ? (
        <SidebarItem
          label="Dashboard"
          icon={<DashboardIcon />}
          active={activeItem === 'Dashboard'}
          onClick={() => handleItemClick('Dashboard')}
        />
      ) : (
        <SidebarItem
          label="Profile"
          icon={<PersonIcon />}
          active={activeItem === 'Profile'}
          onClick={() => handleItemClick('Profile')}
        />
      )}

      {role === Role.ADMIN && (
        <SidebarItem
          label="Profile"
          icon={<PersonIcon />}
          active={activeItem === 'Profile'}
          onClick={() => handleItemClick('Profile')}
        />
      )}

      <Box my={10} />

      <SidebarItem
        label="Logout"
        icon={<ExitToAppIcon />}
        active={activeItem === 'Logout'}
        onClick={() => handleItemClick('Logout')}
      />
    </List>
  );
};

export default SidebarContent;
