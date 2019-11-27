/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useCookie } from "@use-hook/use-cookie";
import React, { useEffect } from "react";
import { SpringUp } from "./SpringUp";
import Button from "./Button";
import { colorBlack, fontColorWhite, fontSizeSmall } from "../styles";
import { PageWidth } from "./PageElements";

const CookieConsentBanner: React.FC<{
  onConsent: (consented: boolean) => void;
}> = ({ onConsent }) => {
  const [consent, setConsent] = useCookie(
    "my-campaign-map-cookie-consent",
    false
  );

  useEffect(() => {
    onConsent(consent);
  }, [consent]);

  return !consent ? (
    <SpringUp
      css={css({
        bottom: 0,
        left: 0,
        position: "fixed",
        width: "100%",
        zIndex: 999
      })}
    >
      <div
        css={css`
          height: 103px;
          background: ${colorBlack};
          ${fontColorWhite}
          ${fontSizeSmall}
          padding: 20px;
        `}
      >
        <PageWidth>
          <div>
            🍪 We use cookies to track site usage and make improvements.
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
              `}
            >
              Okay
            </a>
          </div>
        </PageWidth>
      </div>
    </SpringUp>
  ) : null;
};

export default CookieConsentBanner;
