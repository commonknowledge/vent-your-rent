/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { fontSizeExtraSmall, fontColorBlack } from "../styles";

type PartnerBlockProps = {
  logo: string;
  name: string;
  description?: string;
  linkText?: string;
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
    <div
      css={css`
        ${fontSizeExtraSmall}
        margin-bottom: 30px;
      `}
    >
      <img
        src={logo}
        alt={name}
        css={css`
          max-width: 280px;
        `}
      />
      {!!description && <p>{description}</p>}
      {!!linkText && <a
        href={linkHref}
        css={css`
          ${fontSizeExtraSmall}
          ${fontColorBlack}
          font-weight: 500;
          text-transform: uppercase;
          text-decoration: underline;
        `}
        target="_blank"
        rel="noopener noreferrer"
      >
        {linkText}
      </a>}
    </div>
  );
}
