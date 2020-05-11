/** @jsx jsx */
import { jsx, Box, Grid, Heading, Text, Flex } from 'theme-ui';
import Emoji from 'a11y-react-emoji';
import { ShareAction } from './components/ShareAction';
import GenerationRentBlock from '../../components/GenerationRentBlock';
import { VentDashboard, VentCounter } from './components/VentDashboard';

export const Share: React.FC = () => {
  return (
    <Grid sx={{ height: '100vh' }} columns={[1, null, 2]}>

      {/* Left */}
      <Box sx={{ bg: 'white', p: [3, 4, 5] }}>
        <Heading>
          <Emoji symbol="🙌" />  Thanks for venting
        </Heading>
        <Flex sx={{ my: 3, justifyContent: 'space-between', width: '100%' }}>
          <Box>
            <b>Share your story</b>
            <Text variant='hint' sx={{ fontSize: 0 }}>#ventyourrent</Text>
          </Box>
          <Box>
            <ShareAction message="#ventyourrent" url={"https://ventyour.rent"} />
          </Box>
        </Flex>
        <Box sx={{ my: 4 }}>
          <Heading sx={{ fontWeight: 'body' }}>
            You’re not alone. <b>1 in 4 renters</b> aren’t sure they’ll be able to afford rent in the next 3 months.
        </Heading>
          <p sx={{ display: 'flex' }}>
            <Emoji symbol="🏚" sx={{ pr: 2 }} /> <Text><b>6 in 10 renters</b> have lost income as a result of coronavirus.</Text>
          </p>
          <p sx={{ display: 'flex' }}>
            <Emoji symbol="🏚" sx={{ pr: 2 }} /> <Text><b>1 in 4 renters</b> aren’t sure they’ll be able to afford rent in the next 3 months.</Text>
          </p>
          <p sx={{ display: 'flex' }}>
            <Emoji symbol="🏚" sx={{ pr: 2 }} /> <Text><b>1.8 million private rented homes</b> are flats. People without a garden are at a higher risk of mental illness during lockdown.</Text>
          </p>
        </Box>
        <Box sx={{ my: 4 }}>
          <Heading>Join our movement</Heading>
          <p sx={{ my: 2 }}>We’re calling for better protections for renters during and beyond coronavirus:</p>
          <p sx={{ display: 'flex', my: 2, mb: 1 }}>
            <Emoji symbol="✊" sx={{ pr: 2 }} /> <Text>Housing benefit to cover rents</Text>
          </p>
          <p sx={{ display: 'flex', my: 2 }}>
            <Emoji symbol="✊" sx={{ pr: 2 }} /> <Text>No coronavirus evictions</Text>
          </p>
          <p sx={{ display: 'flex', my: 2 }}>
            <Emoji symbol="✊" sx={{ pr: 2 }} /> <Text>A rent freeze for 12 months</Text>
          </p>
          <Box sx={{ my: 2 }}>
            <Box>
              <a sx={{ variant: 'text.link.bold', my: 2 }} href='https://www.generationrent.org/coronavirus_here_s_what_we_are_asking_the_government'>Read our demands in full</a>
            </Box>
            <Box>
              <a sx={{ variant: 'text.link.bold', my: 2 }} href='/'>Vent your rent again</a>
            </Box>
            <Box>
              <a sx={{ variant: 'text.link.bold', my: 2 }} href='https://generationrent.eaction.online/meetyourmpcoronavirus'>Email your MP</a>
            </Box>
          </Box>
        </Box>
        <Box sx={{ my: 5, filter: 'grayscale()', opacity: 0.5 }} >
          <GenerationRentBlock />
        </Box>
      </Box>

      {/* Right */}
      <Box sx={{ bg: 'grey', p: [3, 4, 5] }}>
        <VentCounter />
        <VentDashboard />
      </Box>
    </Grid>
  )
}
