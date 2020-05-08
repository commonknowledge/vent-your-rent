/** @jsx jsx */
import { jsx, Box, Grid, Heading, Text } from 'theme-ui'
import Emoji from 'a11y-react-emoji';

export const Map: React.FC = () => {
  return (
    <Grid sx={{ height: '100vh' }} columns={[1, null, '340px 1fr']}>
      <Box sx={{ bg: 'white', p: [3, 4, 5] }}>
        <Heading>
          <Emoji symbol="🙌" />  Thanks for venting
        </Heading>
      </Box>
      <Box sx={{ bg: 'grey' }}>
        <pre>/* map here */</pre>
      </Box>
    </Grid>
  )
}
