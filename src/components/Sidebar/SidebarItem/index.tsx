import { cloneElement } from 'react';
import { ListItemText, ListItemButton, ListItemIcon } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SidebarItemProps } from '../../../interfaces/SidebarInterfaces';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/features/slices/authSlice';
import { RootState } from '../../../redux/store';
import { Role } from '../../../interfaces/User';

const SidebarItem = ({ label, icon, active, onClick }: SidebarItemProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleClick = () => {
    onClick();

    if (label === 'Dashboard') {
      navigate('/dashboard/all-users');
    } else if (label === 'Logout') {
      dispatch(logout());
      navigate('/');
    } else if (label === 'Profile') {
      navigate('perfil');
    }
  };

  const getIconColor = () => {
    if (label === 'Profile' && user?.role === Role.USER) {
      return 'var(--tertiary-color)';
    } else if (active) {
      return 'var(--tertiary-color)';
    }
    return 'inherit';
  };

  return (
    <ListItemButton onClick={handleClick} selected={active}>
      <ListItemIcon>
        {cloneElement(icon, { style: { color: getIconColor() } })}
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export default SidebarItem;
