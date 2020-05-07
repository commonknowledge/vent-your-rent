/** @jsx jsx */
import { jsx, Box, Grid, Heading } from 'theme-ui'

export const Index = () => {
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
      </Box>
      <Box sx={{ bg: 'grey', p: [3, 4, 5] }} />
      <Box sx={{ bg: 'white', p: [3, 4, 5] }} />
    </Grid>
  )
}
