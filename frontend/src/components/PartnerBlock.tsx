/** @jsx jsx */
import { jsx } from "@emotion/core";

type PartnerBlockProps = {
  // TODO: For now a string, later, an SVG file
  logo: string;
  name: string;
  description: string;
  linkText: string;
  linkHref: string;
};

export default function PartnerBlock({
  logo,
  description,
  name,
  linkText,
  linkHref
}: PartnerBlockProps) {
  return (
    <div>
      <img src={logo} alt={name} />
      <p>{description}</p>
      <a href={linkHref}>{linkText}</a>
    </div>
  );
}
