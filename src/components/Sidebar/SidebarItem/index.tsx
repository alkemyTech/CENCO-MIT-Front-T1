import { cloneElement } from 'react';
import { ListItemText, ListItemButton, ListItemIcon } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SidebarItemProps } from '../../../interfaces/SidebarInterfaces';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/features/slices/authSlice';

const SidebarItem = ({ label, icon, active, onClick }: SidebarItemProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    onClick(); 

    if (label === 'Dashboard') {
      navigate('/dashboard/all-users');
    } else if (label === 'Logout') {
      dispatch(logout()); 
      navigate('/'); 
    }
  };

  return (
    <ListItemButton onClick={handleClick} selected={active}>
      <ListItemIcon>
        {cloneElement(icon, { style: { color: active ? 'var(--tertiary-color)' : 'inherit' } })}
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export default SidebarItem;
