/** @jsx jsx */
import { jsx, Image, Grid } from 'theme-ui';

import FacebookShareIcon from "../../../components/shares/facebook.svg";
import TwitterShareIcon from "../../../components/shares/twitter.svg";
import WhatsAppShareIcon from "../../../components/shares/whatsapp.svg";
import EmailShareIcon from "../../../components/shares/email.svg";

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

export const ShareAction: React.FC<{
  message: string;
  url: string;
  size?: number
}> = ({ message, url, size = 20 }) => {
  return (
    <Grid columns={4} gap={1}>
      <a sx={{ lineHeight: 0 }} href={facebookShareUrl(url)} target="_blank" rel="noopener noreferrer">
        <Image width={size} src={FacebookShareIcon} alt="Share on Facebook" />
      </a>
      <a sx={{ lineHeight: 0 }}
        href={twitterShareUrl(url, message)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image width={size} src={TwitterShareIcon} alt="Share on Twitter" />
      </a>
      <a sx={{ lineHeight: 0 }}
        href={whatsAppShareUrl(url, message)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image width={size} src={WhatsAppShareIcon} alt="Share to WhatsApp" />
      </a>
      <a sx={{ lineHeight: 0 }}
        href={emailShareUrl(url, "Vent Your Rent!", message)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image width={size} src={EmailShareIcon} alt="Share via email" />
      </a>
    </Grid>
  );
};
