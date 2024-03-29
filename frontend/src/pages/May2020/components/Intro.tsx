/** @jsx jsx */
import { jsx, Box, Heading } from 'theme-ui';
import { Logo } from './Logo';
import GenerationRentBlock from '../../../components/GenerationRentBlock';
import { FooterLinks } from './Footer';

export const Intro = () => {
  return (
    <Box sx={{ bg: 'orange' }}>
      <Box sx={{ pt: [3, 4, 5], pb: [2, 3, 4], px: [3, 3, 4, 5] }}>
        <Logo sx={{ width: '100%', maxWidth: 600, height: 'auto' }} />
        <Heading sx={{ my: 3 }}>
          If have had enough of your rental situation, you’re not alone.
        </Heading>
        <p>Millions of people are worrying about how to pay the rent, if they’ll get an eviction notice in the next year, or how long it will take for their landlord to make repairs.</p>
        <p>We need to make sure that renters’ voices are heard loud and clear by the government.</p>
        <p><b>Share your story and join our movement for change. ➡️</b></p>

        <Box sx={{ mt: 5, mb: 0, filter: 'grayscale(100%)', opacity: 1, mixBlendMode: 'multiply' }} >
          <GenerationRentBlock />
          <a target='_blank' sx={{ color: 'black', textDecoration: 'underline' }} href='https://www.generationrent.org/your_rights'>
            <b>Find out more about your rights as a renter</b>
          </a>
          <Box sx={{ display: ['none', null, 'block'] }}>
            <FooterLinks />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
