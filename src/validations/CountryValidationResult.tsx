interface CountryValidationResult {
    isValid: boolean;
    errorMessage: string;
  }
  
  export function isCountryValid(country: string): CountryValidationResult {
    const countryRegex = /^[a-zA-Zà-ÿÀ-ß' ]+$/;
  
    if (country.length < 2) {
      return {
        isValid: false,
        errorMessage: "El nombre del país debe tener al menos 2 caracteres.",
      };
    }
  
    if (country.length > 50) {
      return {
        isValid: false,
        errorMessage: "El nombre del país no debe exceder los 50 caracteres.",
      };
    }
  
    if (!countryRegex.test(country)) {
      return {
        isValid: false,
        errorMessage: "El nombre del país solo puede contener letras, espacios y apóstrofes.",
      };
    }
  
    return {
      isValid: true,
      errorMessage: "",
    };
  }
  