// src/hooks/useProfileValidation.ts
import { useState, useCallback } from "react";
import { isPhoneValid, isNameValid, isBirthdayValidAndAdult, isCountryValid } from "../validations";
import { User } from "../interfaces/User";

export const useProfileValidation = (formValues: Partial<User>) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateField = useCallback((name: string, value: string) => {
    let error = '';

    switch (name) {
      case 'name': {
        const nameValidation = isNameValid(value);
        if (!nameValidation.isValid) error = nameValidation.errorMessage;
        break;
      }
      case 'country': {
        const countryValidation = isCountryValid(value);
        if (!countryValidation.isValid) error = countryValidation.errorMessage;
        break;
      }
      case 'phone': {
        if (!isPhoneValid(value)) {
          error = "El número de teléfono debe empezar por + y contener 11 o 12 dígitos.";
        }
        break;
      }
      case 'birthday': {
        if (!isBirthdayValidAndAdult(value)) {
          error = "Debe ser una fecha válida y tener al menos 18 años.";
        }
        break;
      }
      default:
        break;
    }

    return error;
  }, []);

  const validate = useCallback(() => {
    const newErrors: { [key: string]: string } = {};

    Object.keys(formValues).forEach((key) => {
      const value = formValues[key as keyof User];
      if (typeof value === "string") {
        newErrors[key] = validateField(key, value);
      }
    });

    setErrors(newErrors);
  }, [formValues, validateField]);

  return { errors, validateField, validate };
};
