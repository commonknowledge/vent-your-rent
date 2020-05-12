/** @jsx jsx */
import { jsx, Box, Grid, Heading, Text, Flex } from 'theme-ui';
import { VentDashboard, VentCounter } from './components/VentDashboard';
import Emoji from 'a11y-react-emoji';
import { VentForm } from './components/VentForm';
import { useHistory } from 'react-router-dom';
import GenerationRentBlock from '../../components/GenerationRentBlock';
import { FooterLinks } from './components/Footer';
import { Fragment } from 'react';
import { Textfit } from 'react-textfit'
import { Logo } from './components/Logo';

export const Index: React.FC = () => {
  const history = useHistory()

  return (
    <Fragment>
      <Grid sx={{
        height: [null, null, '100vh'],
        '> *': {
          height: '100%',
          overflow: 'auto'
        }
      }} columns={[1, 1, 3]} gap={0}>
        {/* Left */}
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

        {/* Center */}
        <Box sx={{ bg: 'grey' }}>
          <Box sx={{ pt: [4, 4, 5], overflow: ['hidden', null, 'auto'] }}>
            <Box sx={{ px: [3, 3, 3, 4] }}>
              <VentCounter />
              <Heading>(and counting!)</Heading>
            </Box>
            <Box sx={{
              px: [3, 3, 3, 4],
              maxHeight: [250, 350, 'none'],
              overflow: 'auto'
            }}>
              <VentDashboard />
            </Box>
          </Box>
        </Box>

        {/* Right */}
        <Box sx={{ bg: 'white' }}>
          <Box sx={{ py: [4, 4, 5], px: [3, 3, 4, 5] }}>
            <Heading>
              <Emoji symbol="📣" />  Now, add <span sx={{ color: 'orange' }}>your</span> story
          </Heading>
            <Heading sx={{ my: 3, fontWeight: 'body' }}>
              How has coronavirus affected your rental situation?
          </Heading>
            {/* <p>We are experiencing a renting crisis but the government is ignoring it. </p> */}
            {/* <p>Politicians need to understand the impact of coronavirus and the lockdown on renters. Our campaign is making sure that renters are heard and protected. </p> */}
            {/* <p>That's where you come in. Please let us know how your life is being affected. Your experiences will help make the case for change in the weeks ahead.</p> */}
            {/* <p><b>Only by coming together can renters change the housing system.</b></p> */}
            <VentForm onSubmitSuccess={() => history.push("/share")} />
          </Box>
        </Box>
      </Grid>
      <Box sx={{ bg: 'orange', py: [4, 4, 5], px: [3, 4, 5], display: ['block', null, 'none'] }}>
        <FooterLinks />
      </Box>
    </Fragment >
  )
}
