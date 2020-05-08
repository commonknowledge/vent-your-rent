/** @jsx jsx */
import { jsx, Box, Grid, Heading, Text } from 'theme-ui'
import { VentDashboard } from './components/VentDashboard';
import Emoji from 'a11y-react-emoji';
import { VentForm } from './components/VentForm';
import { useHistory } from 'react-router-dom';

export const Index: React.FC = () => {
  const history = useHistory()

  return (
    <Grid sx={{ height: '100vh' }} columns={[1, 1, 1, 3]} gap={0}>
      {/* Left */}
      <Box sx={{ bg: 'orange', p: [3, 4, 5] }}>
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
      </Box>

      {/* Center */}
      <Box sx={{ bg: 'grey', p: [3, 4, 5] }}>
        <Heading>
          <span sx={{ color: 'orange' }}>357</span> rent vents
          <br />(and counting!)
        </Heading>
        <VentDashboard />
      </Box>

      {/* Right */}
      <Box sx={{ bg: 'white', p: [3, 4, 5] }}>
        <Heading>
          <Emoji symbol="📣" />  Add your story
        </Heading>
        <Heading sx={{ my: 3, fontWeight: 'body' }}>
          How has coronavirus affected your rental situation?
        </Heading>
        <p>We are experiencing a renting crisis but the government is ignoring it. </p>
        <p>Politicians need to understand the impact of coronavirus and the lockdown on renters. Our campaign is making sure that renters are heard and protected. </p>
        <p>That's where you come in. Please let us know how your life is being affected. Your answers will help us develop our campaigns in the weeks ahead.</p>
        <p><b>Only by coming together can renters change the housing system!</b></p>
        <VentForm onSubmitSuccess={() => history.push("/map")} />
      </Box>
    </Grid>
  )
}
