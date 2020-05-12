/** @jsx jsx */
import { jsx, Box, Grid, Heading, Text, Flex } from 'theme-ui';
import Emoji from 'a11y-react-emoji';
import { ShareAction } from './components/ShareAction';
import GenerationRentBlock from '../../components/GenerationRentBlock';
import { VentDashboard, VentCounter, VentCard } from './components/VentDashboard';
import { VentMap } from './components/VentMap';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import useLocalStorage from '@rehooks/local-storage';
import { YourVentQuery } from './__graphql__/YourVentQuery';

const VENT_QUERY = gql`
  query YourVentQuery($id: String!) {
    vent(id: $id) {
      ...VentCard2020
    }
  }

  ${(VentCard as any).fragment}
`

export const Share: React.FC = () => {
  const [ids] = useLocalStorage('VENT_YOUR_RENT_VENT_IDS', [])
  const vent = useQuery<YourVentQuery>(VENT_QUERY, {
    variables: { id: ids.length ? ids[ids.length - 1] : -1 }
  })
  const yourVent = vent?.data?.vent

  return (
    <Grid sx={{
      height: [null, null, '100vh'],
      '> *': {
        height: '100%',
        overflow: 'auto'
      }
    }} columns={[1, null, 2]} gap={0}>
      {/* Left */}
      <Box sx={{ bg: 'white' }}>
        <Box sx={{ p: [3, 4, 5] }}>
          <Heading>
            <Emoji symbol="🙌" />  Thanks for venting
          </Heading>
          <Box sx={{ my: 3 }}>
            {yourVent && (
              <VentCard vent={yourVent} sx={{ bg: 'orangeLight' }} />
            )}
          </Box>
          <Flex sx={{ my: 3, justifyContent: 'space-between', width: '100%' }}>
            <Box>
              <b>Share your story</b>
              <Text variant='hint' sx={{ fontSize: 0 }}>#ventyourrent</Text>
            </Box>
            <Box>
              <ShareAction
                message={yourVent ? yourVent.caption + " #ventyourrent" : "#ventyourrent"}
                url={yourVent ? `https://ventyour.rent/${yourVent.id}` : `https://ventyour.rent`}
              />
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
          <Box sx={{ mt: 4, mb: [2, 3, 4] }}>
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
                <a sx={{ variant: 'text.link.bold', my: 2 }} target="_blank" href='https://www.generationrent.org/coronavirus_here_s_what_we_are_asking_the_government'>Read our demands in full</a>
              </Box>
              <Box>
                <a sx={{ variant: 'text.link.bold', my: 2 }} target="_blank" href='/'>Vent your rent again</a>
              </Box>
              <Box>
                <a sx={{ variant: 'text.link.bold', my: 2 }} target="_blank" href='https://generationrent.eaction.online/meetyourmpcoronavirus'>Email your MP</a>
              </Box>
            </Box>
          </Box>
          <Box sx={{ my: 5, filter: 'grayscale()', opacity: 0.5 }} >
            <GenerationRentBlock />
          </Box>
        </Box>
      </Box>

      {/* Right */}
      <Box sx={{ bg: 'grey', position: 'relative' }}>
        <VentMap />
      </Box>
    </Grid>
  )
}
