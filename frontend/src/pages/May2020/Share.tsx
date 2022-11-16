/** @jsx jsx */
import { jsx, Box, Grid, Heading, Text, Flex } from 'theme-ui';
import { ShareAction } from './components/ShareAction';
import GenerationRentBlock from '../../components/GenerationRentBlock';
import { VentDashboard, VentCounter, VentCard } from './components/VentDashboard';
import { VentMap } from './components/VentMap';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import useLocalStorage from '@rehooks/local-storage';
import { YourVentQuery } from './__graphql__/YourVentQuery';
import { Emoji } from 'emoji-mart';
import { Fragment } from 'react';

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
    }} columns={[1, '2fr min(600px, max(400px, 33%))']} gap={0}>
      {/* Right */}
      <Box sx={{ bg: 'grey', position: 'relative', minWidth: '50%' }} key='map'>
        <VentMap />
        <Box sx={{ position: 'absolute', top: 0, left: 0, m: [3, 4, 5] }}>
          <VentCounter />
        </Box>
      </Box>

      {/* Left */}
      <Box sx={{ bg: 'white' }} key='signup-form'>
        <Box sx={{ p: [3, 4, 4, 5] }}>
          {yourVent && (
            <Fragment>
              <Heading>
                <Emoji emoji="raised_hands" size={28} set='apple' />  Thanks for venting
              </Heading>
              <Box sx={{ my: 3 }}>
                <VentCard vent={yourVent} sx={{ bg: 'orangeLight' }} />
              </Box>
            </Fragment>
          )}
          <Flex sx={{ my: 3, justifyContent: 'space-between', width: '100%' }}>
            <Box>
              <b>Share {yourVent && 'your story'}</b>
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
              You’re not alone.
            </Heading>
            <p sx={{ display: 'flex' }}>
              <Emoji emoji={'derelict_house_building'} set='apple' size={18} sx={{ pr: 2 }} /> <Text><b>1 in 4 homes</b> fails decency standards</Text>
            </p>
            <p sx={{ display: 'flex' }}>
              <Emoji emoji={'derelict_house_building'} set='apple' size={18} sx={{ pr: 2 }} /> <Text><b>45% of private renters</b> were asked for a higher rent in 2021-22</Text>
            </p>
            <p sx={{ display: 'flex' }}>
              <Emoji emoji={'derelict_house_building'} set='apple' size={18} sx={{ pr: 2 }} /> <Text>Evictions are at their highest level since 2017</Text>
            </p>
          </Box>
          <Box sx={{ mt: 4, mb: [2, 3, 4] }}>
            <Heading>Join our movement</Heading>
            <p sx={{ my: 2 }}>We’re calling for better protections for renters during and beyond coronavirus:</p>
            <p sx={{ display: 'flex', my: 2, mb: 1 }}>
              <Emoji emoji="fist" set='apple' size={18} sx={{ pr: 2 }} /> <Text>Housing benefit to cover rents</Text>
            </p>
            <p sx={{ display: 'flex', my: 2 }}>
              <Emoji emoji="fist" set='apple' size={18} sx={{ pr: 2 }} /> <Text>End unfair evictions</Text>
            </p>
            <p sx={{ display: 'flex', my: 2 }}>
              <Emoji emoji="fist" set='apple' size={18} sx={{ pr: 2 }} /> <Text>Limits on rent increases</Text>
            </p>
            <Box sx={{ my: 2 }}>
              <Box>
                <a sx={{ variant: 'text.link.bold', my: 2 }} target="_blank" href='https://www.generationrent.org/your_rights'>
                  Know your rights
                </a>
              </Box>
              <Box>
                <a sx={{ variant: 'text.link.bold', my: 2 }} target="_blank" href='https://www.generationrent.org/campaigns_hub'>
                  Join our campaigns
                </a>
              </Box>
              <Box>
                <a sx={{ variant: 'text.link.bold', my: 2 }} target="_blank" href='https://www.generationrent.org/volunteer'>
                  Become a volunteer
                </a>
              </Box>
            </Box>
          </Box>
          <Box sx={{ my: 5, filter: 'grayscale()', opacity: 0.5 }} >
            <GenerationRentBlock />
          </Box>
        </Box>
      </Box>
    </Grid>
  )
}
