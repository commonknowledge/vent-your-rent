/** @jsx jsx */
import { jsx, Box } from 'theme-ui';

export const FooterLinks = () => {
  return (
    <Box sx={{ my: 3, '> *': { mr: 3 }, textTransform: 'uppercase', fontSize: 0 }}>
      <a target='_blank' sx={{ color: 'black' }} href='https://www.generationrent.org/contact'><b>Contact</b></a>
      <a target='_blank' sx={{ color: 'black' }} href='https://www.generationrent.org/privacy_notice'><b>Privacy</b></a>
      <a target='_blank' sx={{ color: 'black' }} href='https://commonknowledge.coop'>Site by&nbsp;<b>Common&nbsp;Knowledge</b></a>
    </Box>
  )
}
