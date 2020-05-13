/** @jsx jsx */
import { jsx, ThemeProvider } from 'theme-ui'
import { Switch, Route } from 'react-router-dom';
import theme from '../../theme';
import { Index } from './Index';
import { Share } from './Share';
import { Split } from './Split';
import { AnalyticsProvider } from '../../analytics/browser';

export const RoutesMay2020 = () => {
  return (
    <AnalyticsProvider>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path='/split' component={Split} />
          <Route path='/share' component={Share} />
          <Route component={Index} />
        </Switch>
      </ThemeProvider>
    </AnalyticsProvider>
  )
}
