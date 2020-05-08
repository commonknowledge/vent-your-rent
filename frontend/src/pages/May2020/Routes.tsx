/** @jsx jsx */
import { jsx, ThemeProvider } from 'theme-ui'
import { Switch, Route } from 'react-router-dom';
import theme from '../../theme';
import { Index } from './Index';
import { Share } from './Share';

export const RoutesMay2020 = () => {
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route path='/map' component={Share} />
        <Route component={Index} />
      </Switch>
    </ThemeProvider>
  )
}
