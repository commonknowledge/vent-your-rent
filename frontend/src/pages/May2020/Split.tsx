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
import { VentMap } from './components/VentMap';
import { Intro } from './components/Intro';

export const Split: React.FC = () => {
  const history = useHistory()

  return (
    <Fragment>
      <Grid sx={{
        height: [null, null, '100vh'],
        '> *': {
          height: '100%',
          overflow: 'auto'
        }
      }} columns={[1, 1, '2fr min(600px, max(400px, 33%))']} gap={0}>
        {/*  */}
        <Box sx={{ display: ['block', 'block', 'none'] }}>
          <Intro />
        </Box>

        {/*  */}
        <Box sx={{ bg: 'grey', position: 'relative', minWidth: '50%', maxHeight: [300, null, 'none'], height: ['50vh', '50vh', '100%'] }} key='map'>
          <VentMap />
          <Flex sx={{
            width: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            p: [3, 4, 5],
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <VentCounter />

            <Link to='/'>
              <Button variant='ghost' sx={{ borderColor: 'orange', bg: 'white' }}>
                <span sx={{ fontWeight: 'emphasis', fontSize: 1 }}>
                  &larr; Back
                </span>
              </Button>
            </Link>
          </Flex>
        </Box>

        {/* Right */}
        <Box sx={{ bg: 'white' }} key='share-success'>
          <Box sx={{ py: [4, 4, 5], px: [3, 3, 4, 5] }}>
            <Heading>
              <Emoji emoji="mega" size={28} set='apple' />  Now, add <span sx={{ color: 'orange' }}>your</span> story
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
