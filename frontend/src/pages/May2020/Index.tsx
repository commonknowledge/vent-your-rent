/** @jsx jsx */
import { jsx, Box, Grid, Heading, Text } from 'theme-ui'

export const Index: React.FC = () => {
  return (
    <Grid sx={{ height: '100vh' }} columns={[1, 1, 1, 3]} gap={0}>
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
        <Text variant='para'>Coronavirus has hit the incomes of millions of renters who are now worried about how to pay the rent.  When the eviction ban is lifted, renters in arrears will face debt and homelessness.</Text>
        <Text variant='para'>We need to make sure that renters’ voices are heard loud and clear by the government.</Text>
        <Text variant='para' sx={{ fontWeight: 'emphasis' }}>Share your story and join our movement for change.</Text>
      </Box>
      <Box sx={{ bg: 'grey', p: [3, 4, 5] }} />
      <Box sx={{ bg: 'white', p: [3, 4, 5] }} />
    </Grid>
  )
}
