import Postcode from "postcode";

export const validatePostcode = (postcode: string) => {
  const p = new Postcode(postcode.trim());
  return Boolean(p.valid() && p.incode());
};
