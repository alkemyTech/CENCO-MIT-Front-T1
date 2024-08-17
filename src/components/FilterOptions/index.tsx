import { Menu, MenuItem } from '@mui/material';

interface FilterOptionsProps {
  anchorEl: null | HTMLElement;
  onClose: () => void;
  onSortOrderChange: (order: 'asc' | 'desc') => void;
  onStatusFilterChange: (status: '' | 'active' | 'inactive') => void;
}

const FilterOptions = ({ anchorEl, onClose, onSortOrderChange, onStatusFilterChange }: FilterOptionsProps) => {

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
    >
      <MenuItem onClick={() => onSortOrderChange('asc')}>Sort by Ascending</MenuItem>
      <MenuItem onClick={() => onSortOrderChange('desc')}>Sort by Descending</MenuItem>
      <MenuItem onClick={() => onStatusFilterChange('active')}>Filter Actives</MenuItem>
      <MenuItem onClick={() => onStatusFilterChange('inactive')}>Filter Inactives</MenuItem>
      <MenuItem onClick={() => onStatusFilterChange('')}>Show All</MenuItem>
    </Menu>
  );
};

export default FilterOptions;
