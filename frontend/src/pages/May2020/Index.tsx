/** @jsx jsx */
import { jsx, Box, Grid, Heading, Text, Flex } from 'theme-ui';
import { VentDashboard, VentCounter } from './components/VentDashboard';
import Emoji from 'a11y-react-emoji';
import { VentForm } from './components/VentForm';
import { useHistory } from 'react-router-dom';
import GenerationRentBlock from '../../components/GenerationRentBlock';

export const Index: React.FC = () => {
  const history = useHistory()

  return (
    <Grid sx={{
      height: '100vh',
      '> *': {
        height: '100%',
        overflow: 'auto'
      }
    }} columns={[1, 1, 1, 3]} gap={0}>
      {/* Left */}
      <Box sx={{ bg: 'orange' }}>
        <Box sx={{ p: [3, 4, 5] }}>
          <Heading as='h1' sx={{
            lineHeight: 0.8,
            textTransform: 'uppercase',
            fontSize: 3,
            fontWeight: 900,
            color: 'white'
          }}>
            Vent Your Rent
          </Heading>
          <Heading sx={{ my: 3 }}>
            If you’re worried about your rental situation during coronavirus, you’re not alone.
          </Heading>
          <p>Coronavirus has hit the incomes of millions of renters who are now worried about how to pay the rent.  When the eviction ban is lifted, renters in arrears will face debt and homelessness.</p>
          <p>We need to make sure that renters’ voices are heard lbud and clear by the government.</p>
          <p><b>Share your story and join our movement for change.</b></p>

          <Box sx={{ my: 5, filter: 'grayscale(100%)', opacity: 1, mixBlendMode: 'multiply' }} >
            <GenerationRentBlock />
            <a target='_blank' sx={{ color: 'black', textDecoration: 'underline' }} href='https://www.generationrent.org/coronavirus_here_s_what_we_are_asking_the_government'>
              <b>Find out more</b>
            </a> about our campaign to protect renters affected by coronavirus
            <Flex sx={{ my: 3, '> *': { mr: 3 }, textTransform: 'uppercase', fontSize: 0 }}>
              <a target='_blank' sx={{ color: 'black' }} href='https://www.generationrent.org/contact'><b>Contact</b></a>
              <a target='_blank' sx={{ color: 'black' }} href='https://www.generationrent.org/privacy_notice'><b>Privacy</b></a>
              <a target='_blank' sx={{ color: 'black' }} href='https://commonknowledge.coop'>Site by <b>Common Knowledge</b></a>
            </Flex>
          </Box>
        </Box>
      </Box>

      {/* Center */}
      <Box sx={{ bg: 'grey' }}>
        <Box sx={{ p: [3, 4, 5] }}>
          <VentCounter />
          <VentDashboard />
        </Box>
      </Box>

      {/* Right */}
      <Box sx={{ bg: 'white' }}>
        <Box sx={{ p: [3, 4, 5] }}>
          <Heading>
            <Emoji symbol="📣" />  Add your story
          </Heading>
          <Heading sx={{ my: 3, fontWeight: 'body' }}>
            How has coronavirus affected your rental situation?
          </Heading>
          <p>We are experiencing a renting crisis but the government is ignoring it. </p>
          <p>Politicians need to understand the impact of coronavirus and the lockdown on renters. Our campaign is making sure that renters are heard and protected. </p>
          <p>That's where you come in. Please let us know how your life is being affected. Your experiences will help make the case for change in the weeks ahead.</p>
          <p><b>Only by coming together can renters change the housing system.</b></p>
          <VentForm onSubmitSuccess={() => history.push("/share")} />
        </Box>
      </Box>
    </Grid>
  )
}
