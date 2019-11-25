/** @jsx jsx */
import { jsx } from "@emotion/core";

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

export default function ShareBar() {
  return (
    <div>
      <div>Facebook</div>
      <div>Twitter</div>
      <div>WhatsApp</div>
      <div>Email</div>
    </div>
  );
}
