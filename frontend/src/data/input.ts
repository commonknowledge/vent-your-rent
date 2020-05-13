import emailRegex from "email-regex";

let EMAIL_REGEX = emailRegex({ exact: true });

export function validateEmail(value: string) {
  let errors: string[] = [];

  if (!EMAIL_REGEX.test(value)) {
    errors.push("Must be valid email");
  }

  return errors;
}

export const minLength = (
  min: number,
  message: string = `Minimum ${min} characters`
) => (value: string) => {
  let errors: string[] = [];

  if (value?.length < min) {
    errors.push(message)
  }

  return errors;
}

export const maxLength = (
  max: number,
  message: string = `Maximum ${max} characters`
) => (value: string) => {
  let errors: string[] = [];

  if (value?.length > max) {
    errors.push(message)
  }

  return errors;
}
