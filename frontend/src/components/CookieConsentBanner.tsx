/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useCookie } from "@use-hook/use-cookie";
import React, { useEffect } from "react";
import { colorBlack, fontColorWhite, fontSizeSmall } from "../styles";
import { PageWidth } from "./PageElements";
import { Emoji } from 'emoji-mart';

const CookieConsentBanner: React.FC<{
  onConsent: (consented: boolean) => void;
}> = ({ onConsent }) => {
  const [consent, setConsent] = useCookie(
    "vent-your-rent-cookie-consent",
    false
  );

  useEffect(() => {
    onConsent(consent);
  }, [consent, onConsent]);

  return !consent ? (
    <div
      css={css`
        opacity: 0.95;
        display: inline-block;
        bottom: 10px;
        left: 10px;
        margin-right: 10px;
        position: fixed;
        z-index: 999;
        background: ${colorBlack};
        ${fontColorWhite}
        font-size: 14px;
        padding: 10px;
        border-radius: 8px;
      `}
    >
      <Emoji emoji="cookie" set='apple' size={14} />
      &nbsp;
      We use cookies to track site usage and make improvements.
      &nbsp;
      <a onClick={() => setConsent(true)} css={css`text-transform: uppercase; cursor: pointer;`}>Okay</a>
    </div >
  ) : null;
};

export default CookieConsentBanner;
