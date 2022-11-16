/** @jsx jsx */
import { jsx, Box, Grid, Heading, Text, Flex, Button } from 'theme-ui';
import { VentDashboard, VentCounter } from './components/VentDashboard';
import { Emoji } from 'emoji-mart';
import { VentForm } from './components/VentForm';
import { useHistory, Link } from 'react-router-dom';
import GenerationRentBlock from '../../components/GenerationRentBlock';
import { FooterLinks } from './components/Footer';
import { Fragment } from 'react';
import { Textfit } from 'react-textfit'
import { Logo } from './components/Logo';
import { Intro } from './components/Intro';

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
        <Intro />

        {/* Center */}
        <Box sx={{ bg: 'grey' }}>
          <Box sx={{ pt: [4, 4, 5], overflow: ['hidden', null, 'auto'] }}>
            <Flex sx={{ px: [3, 3, 3, 4], width: '100%', justifyContent: 'space-between' }}>
              <Box>
                <VentCounter />
                <Heading>(and counting!)</Heading>
              </Box>
              <Link to='/split'>
                <Button variant='ghost' sx={{ borderColor: 'orange', bg: 'white' }}>
                  <Emoji emoji='world_map' size={24} set='apple' />
                  &nbsp;
                  <span sx={{ fontWeight: 'emphasis', fontSize: 1 }}>
                    See the map
                  </span>
                </Button>
              </Link>
            </Flex>
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
              <Emoji emoji="mega" size={28} set='apple' />  Now, add <span sx={{ color: 'orange' }}>your</span> story
          </Heading>
          <Heading sx={{ my: 3, fontWeight: 'body' }}>
              Tell us about your rental situation
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
