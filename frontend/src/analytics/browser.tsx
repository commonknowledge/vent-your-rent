import React from 'react'
import * as posthog from 'posthog-js';
import { AnalyticsData } from './shared';
import { createContext, useContext } from 'react';

if (posthog) {
  try {
    posthog.init(process.env.REACT_APP_POSTHOG_CLIENT_ID, { api_host: process.env.REACT_APP_POSTHOG_URL });
  } catch (e) {
    console.error(e)
  }
}

const environment = process.env.NODE_ENV

export const analytics = {
  trackView: () => posthog.capture('$pageview'),
  trackEvent: (event: string, data: AnalyticsData) => {
    if (environment !== 'production') return
    try {
      // @ts-ignore
      gtag('event', event, {
        'event_category': data?.category,
        'event_label': data?.label
      });
    } catch (e) {
      console.error("Google Analytics has not been initialised correctly.")
    }
    try {
      posthog.capture(event, { environment, system: 'browser', type: 'event', ...data })
    } catch (e) {
      console.error(e)
    }
  },
  trackError: (event: string, data?: any) => {
    if (environment !== 'production') return
    try {
      posthog.capture(event, { environment, system: 'browser', type: 'error', ...data })
    } catch (e) {
      console.error(e)
    }
  }
}

export const AnalyticsContext = createContext(analytics)

export const useAnalytics = () => useContext(AnalyticsContext)

export const AnalyticsProvider: React.FC = (props) => <AnalyticsContext.Provider value={analytics} {...props} />
