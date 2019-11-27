/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useCookie } from "@use-hook/use-cookie";
import React, { useEffect } from "react";
import { SpringUp } from "./SpringUp";
import { colorBlack, fontColorWhite, fontSizeSmall } from "../styles";
import { PageWidth } from "./PageElements";
import Emoji from "a11y-react-emoji";

const CookieConsentBanner: React.FC<{
  onConsent: (consented: boolean) => void;
}> = ({ onConsent }) => {
  const [consent, setConsent] = useCookie(
    "my-campaign-map-cookie-consent",
    false
  );

  useEffect(() => {
    onConsent(consent);
  }, [consent, onConsent]);

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
            <Emoji symbol="🍪" /> We use cookies to track site usage and make
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
    </SpringUp>
  ) : null;
};

export default CookieConsentBanner;
