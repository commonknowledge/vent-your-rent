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
        width: 100%;
        bottom: 0;
        position: fixed;
        z-index: 999;
        height: ${'103px'};
        background: ${colorBlack};
        ${fontColorWhite}
        ${fontSizeSmall}
        padding: 20px;
      `}
    >
      <PageWidth>
        <div>
          <Emoji emoji="cookie" set='apple' size={24} /> We use cookies to track site usage and make
            improvements.
          </div>
        <div
          css={css`
              margin-top: 10px;
            `}
        >
          <a
            onClick={() => setConsent(true)}
            css={css`
                text-transform: uppercase;
                text-decoration: underline;
                cursor: pointer;
              `}
          >
            Okay
            </a>
        </div>
      </PageWidth>
    </div>
  ) : null;
};

export default CookieConsentBanner;
