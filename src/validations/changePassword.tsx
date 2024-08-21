


export const isPasswordValid = (password: string): boolean => {
    // Define password validation criteria
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;
    // ^(?=.*[A-Z]) - at least one uppercase letter
    // (?=.*[!@#$%^&*]) - at least one special character
    // (?=.*\d) - at least one digit
    // {8,} - at least 8 characters long
    
    // Validate password format
    return passwordRegex.test(password);
  };