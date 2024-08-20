// src/utils/validateProfileForm.ts
import { isPhoneValid, isNameValid, isBirthdayValidAndAdult, isCountryValid } from "../validations";
import { User } from "../interfaces/User";

export const validateProfileForm = (formValues: Partial<User>) => {
  const errors: { [key: string]: string } = {};

  const nameValidation = isNameValid(formValues.name || "");
  if (!nameValidation.isValid) {
    errors.name = nameValidation.errorMessage;
  }

  const countryValidation = isCountryValid(formValues.country || "");
  if (!countryValidation.isValid) {
    errors.country = countryValidation.errorMessage;
  }

  if (!isPhoneValid(formValues.phone || "")) {
    errors.phone = "El número de teléfono debe empezar por + y contener 11 o 12 dígitos.";
  }

  if (!isBirthdayValidAndAdult(formValues.birthday || "")) {
    errors.birthday = "Debe ser una fecha válida y tener al menos 18 años.";
  }

  return errors;
};
