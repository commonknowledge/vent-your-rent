import emailRegex from "email-regex";

let EMAIL_REGEX = emailRegex({ exact: true });

export function validateEmail(value: string) {
  let errors = [];

  if (!EMAIL_REGEX.test(value)) {
    errors.push("Must be valid email");
  }

  return errors;
}
