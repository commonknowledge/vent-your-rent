/** @jsx jsx */
import { jsx } from "@emotion/core";

import FacebookShareIcon from "./shares/facebook.svg";

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

const ShareBar: React.FC<ShareBarProps> = ({ message, url }) => {
  return (
    <div>
      <a href={facebookShareUrl(url)}>{FacebookShareIcon} Facebook</a>
      <a href={twitterShareUrl(url, message)}>Twitter</a>
      <a href={whatsAppShareUrl(url, message)}>WhatsApp</a>
      <a href={emailShareUrl(url, "Vent Your Rent", message)}>Email</a>
    </div>
  );
};

export default ShareBar;
