import { useState } from 'react';
import { List, Box } from '@mui/material';
import SidebarItem from '../SidebarItem';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { SidebarContentProps } from '../../../interfaces/SidebarInterfaces';

const SidebarContent = ({ isMobile, onLinkClick }: SidebarContentProps) => {
  const [activeItem, setActiveItem] = useState('Dashboard');

  const handleItemClick = (item: string) => {
    setActiveItem(item);
    if (isMobile) {
      onLinkClick();
    }
  };

  return (
    <List>
      <SidebarItem
        label="Dashboard"
        icon={<DashboardIcon />}
        active={activeItem === 'Dashboard'}
        onClick={() => handleItemClick('Dashboard')}
      />
      <SidebarItem
        label="Profile"
        icon={<PersonIcon />}
        active={activeItem === 'Profile'}
        onClick={() => handleItemClick('Profile')}
      />
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
