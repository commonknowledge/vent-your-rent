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
          If you’re worried about your rental situation during coronavirus, you’re not alone.
        </Heading>
        <p>Coronavirus has hit the incomes of millions of renters who are now worried about how to pay the rent.  When the eviction ban is lifted, renters in arrears will face debt and homelessness.</p>
        <p>We need to make sure that renters’ voices are heard loud and clear by the government.</p>
        <p><b>Share your story and join our movement for change. ➡️</b></p>

        <Box sx={{ mt: 5, mb: 0, filter: 'grayscale(100%)', opacity: 1, mixBlendMode: 'multiply' }} >
          <GenerationRentBlock />
          <a target='_blank' sx={{ color: 'black', textDecoration: 'underline' }} href='https://www.generationrent.org/coronavirus_here_s_what_we_are_asking_the_government'>
            <b>Find out more</b>
          </a> about our campaign to protect renters affected by coronavirus
        <Box sx={{ display: ['none', null, 'block'] }}>
            <FooterLinks />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
