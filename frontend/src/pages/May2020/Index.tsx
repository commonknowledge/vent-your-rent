/** @jsx jsx */
import { jsx, ThemeProvider, Box, Flex, Grid } from 'theme-ui'

export const Index = () => {
  return (
    <Grid sx={{ height: '100vh' }} columns={[ 3 ]} gap={0}>
      <Box sx={{ bg: 'orange' }} />
      <Box sx={{ bg: 'grey' }} />
      <Box sx={{ bg: 'white' }} />
    </Grid>
  )
}
