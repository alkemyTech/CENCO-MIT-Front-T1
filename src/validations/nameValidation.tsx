interface NameValidationResult {
    isValid: boolean;
    errorMessage: string;
  }
  
  export function isNameValid(name: string): NameValidationResult {
    const nameRegex = /^[a-zA-Zà-ÿÀ-ß' ]+$/;
  
    if (name.length < 2) {
      return {
        isValid: false,
        errorMessage: "El nombre debe tener al menos 2 caracteres.",
      };
    }
  
    if (name.length > 50) {
      return {
        isValid: false,
        errorMessage: "El nombre no debe exceder los 50 caracteres.",
      };
    }
  
    if (!nameRegex.test(name)) {
      return {
        isValid: false,
        errorMessage: "El nombre solo puede contener letras, espacios y apóstrofes.",
      };
    }
  
    return {
      isValid: true,
      errorMessage: "",
    };
  }
  