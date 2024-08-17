
import { CircularProgress, Box } from '@mui/material';
import { LoadingSpinnerProps } from '../../interfaces/LoadingSpinnerProps';


const LoadingSpinner = ({ 
    size = 40, 
    thickness = 3.6, 
    color = 'primary', 
    centered = true 
  }: LoadingSpinnerProps) => {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: centered ? 'center' : 'flex-start', 
          alignItems: centered ? 'center' : 'flex-start', 
          height: centered ? '100vh' : 'auto', 
          width: '100%' 
        }}
      >
        <CircularProgress 
          size={size} 
          thickness={thickness} 
          color={color} 
        />
      </Box>
    );
  };
  
  export default LoadingSpinner;
