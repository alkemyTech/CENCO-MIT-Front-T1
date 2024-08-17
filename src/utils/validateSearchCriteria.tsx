export const validateSearchCriteria = (searchQuery: string) => {

    const queryParams: { name?: string; email?: string; country?: string } = {};
  
    if (searchQuery.includes('@') && searchQuery.includes('.')) {
      queryParams.email = searchQuery; 
    } else if (searchQuery.includes('@')) {
      return { error: 'No se encontraron usuarios, ingresa un correo electronico con formato de correo correcto ej: carla@example.com' };
    } else if (searchQuery.match(/^[A-Za-z\s]+$/)) {
      queryParams.name = searchQuery; 
    } else {
      queryParams.country = searchQuery; 
    }
  
    return { queryParams };
  };