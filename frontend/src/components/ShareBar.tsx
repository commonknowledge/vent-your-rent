/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import FacebookShareIcon from "./shares/facebook.svg";
import TwitterShareIcon from "./shares/twitter.svg";
import WhatsAppShareIcon from "./shares/whatsapp.svg";
import EmailShareIcon from "./shares/email.svg";

import { smallSpacing } from "../styles";

// Sharing URL functionality adapted from react-social-sharing
// https://github.com/SaraVieira/react-social-sharing
function facebookShareUrl(link: string) {
  return `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`;
}

function twitterShareUrl(link: string, message: string) {
  return `https://twitter.com/intent/tweet/?text=${encodeURIComponent(
    message
  )}&url=${encodeURIComponent(link)}`;
}

function whatsAppShareUrl(link: string, message: string) {
  return `whatsapp://send?text=${encodeURIComponent(
    message
  )}%20${encodeURIComponent(link)}`;
}

function emailShareUrl(link: string, subject: string, body?: string) {
  return `mailto:?subject=${encodeURIComponent(
    subject || ""
  )}&body=${encodeURIComponent((body && `${body}\n\n${link}`) || link)}`;
}

type ShareBarProps = {
  message: string;
  url: string;
};

const shareIconCSS = css`
  a {
    margin-right: ${smallSpacing};
  }
`;

const ShareBar: React.FC<ShareBarProps> = ({ message, url }) => {
  return (
    <div css={shareIconCSS}>
      <a href={facebookShareUrl(url)} target="_blank" rel="noopener noreferrer">
        <img src={FacebookShareIcon} alt="Share on Facebook" />
      </a>
      <a
        href={twitterShareUrl(url, message)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={TwitterShareIcon} alt="Share on Twitter" />
      </a>
      <a
        href={whatsAppShareUrl(url, message)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={WhatsAppShareIcon} alt="Share to WhatsApp" />
      </a>
      <a
        href={emailShareUrl(url, "Vent Your Rent!", message)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={EmailShareIcon} alt="Share via email" />
      </a>
    </div>
  );
};

export default ShareBar;
