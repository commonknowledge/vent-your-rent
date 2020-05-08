/** @jsx jsx */
import { jsx, ThemeProvider } from 'theme-ui'
import { Switch, Route } from 'react-router-dom';
import theme from '../../theme';
import { Index } from './Index';
import { Map } from './Map';

export const RoutesMay2020 = () => {
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route path='/map' component={Map} />
        <Route component={Index} />
      </Switch>
    </ThemeProvider>
  )
}
