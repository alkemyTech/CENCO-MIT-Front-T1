import { Box, BoxProps, styled } from "@mui/material";

const ColorBox = styled(Box)<BoxProps>(() => ({
    position: 'absolute',
    top: '50%', // Centrar verticalmente
    left: '50%', // Centrar horizontalmente
    transform: 'translate(-50%, -50%)', // Ajustar el centro exacto del modal
    width: '599px', // Ancho fijo
    height: '735px', // Alto fijo
    bgcolor: 'background.paper',
    border: '2px solid transparent',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
    borderRadius: '30px',
    variants: [],// Add an empty variants array
    
  
}));




  
  export default ColorBox;
  