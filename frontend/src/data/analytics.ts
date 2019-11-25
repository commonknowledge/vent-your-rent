import { createContext, useContext } from "react";
// import mixpanel, { Mixpanel } from 'mixpanel-browser'
import { noop } from "lodash";
import googleAnalytics from "react-ga";
import ReactPixel from "react-facebook-pixel";

const GOOGLE_ANALYTICS_ID = "UA-48954138-7";

const advancedMatching = process.env.FACBOOK_PIXEL_MATCHING
  ? JSON.parse(process.env.FACBOOK_PIXEL_MATCHING)
  : undefined;

export const initialiseUserTracking = () => {
  if (process.env.FACEBOOK_TRACKING_ID) {
    ReactPixel.init(process.env.FACEBOOK_TRACKING_ID, advancedMatching, {
      autoConfig: true,
      debug: process.env.NODE_ENV === "development"
    });
  }

  googleAnalytics.initialize(GOOGLE_ANALYTICS_ID!, {
    debug: process.env.NODE_ENV === "development"
  });
};

export const initialiseAnalytics = (dev?: boolean): Analytics => {
  // Track user events
  initialiseUserTracking();

  const logView: Analytics["logView"] = dev
    ? noop
    : (path, context) => {
        googleAnalytics.set({ page: path });
        googleAnalytics.pageview(path);
      };

  // @ts-ignore
  logView(window.location.pathname);

  return {
    initialiseCookies: dev ? noop : () => {},
    setUserId: dev
      ? noop
      : id => {
          googleAnalytics.set({ userId: id });
        },
    logView,
    logEvent: dev
      ? noop
      : (event, context = {}) => {
          if (process.env.FACEBOOK_TRACKING_ID) {
            ReactPixel.track(event, context);
          }

          googleAnalytics.event({
            category: "User",
            action: event,
            label: context.value,
            value: context.metric as any
          });
        }
  };
};

/**
 * Hooks
 */

export const analytics = initialiseAnalytics(
  process.env.NODE_ENV !== "production"
);
const AnalyticsContext = createContext<Analytics>({
  logEvent: noop,
  logView: noop,
  initialiseCookies: noop,
  setUserId: noop
});
export const AnalyticsProvider = AnalyticsContext.Provider;
export const AnalyticsConsumer = AnalyticsContext.Consumer;
export const useAnalytics = () => useContext(AnalyticsContext);

/**
 * App-level abstractions
 */

type AnalyticsContext = { [property: string]: string };

export interface Analytics {
  initialiseCookies: () => void;
  setUserId: (id: string) => void;
  logView: (path: string, context?: AnalyticsContext) => void;
  logEvent: (
    event: string,
    context?: { value?: string; metric?: number }
  ) => void;
}
