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
  message: string = `Must be at least ${min} characters`
) => (value: string) => {
  let errors: string[] = [];

  if (value?.length < min) {
    errors.push(message)
  }

  console.log(value, value?.length, min, errors)

  return errors;
}

export const maxLength = (
  max: number,
  message: string = `Must not be longer than ${max} characters`
) => (value: string) => {
  let errors: string[] = [];

  if (value?.length > max) {
    errors.push(message)
  }

  console.log(value, value?.length, max, errors)

  return errors;
}
