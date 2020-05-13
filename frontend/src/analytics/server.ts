// import PostHog from 'posthog-node'
import { AnalyticsData } from './shared';

// const client = new PostHog(
//   process.env.POSTHOG_SERVER_ID, { host: process.env.POSTHOG_URL }
// )

// const environment = process.env.NODE_ENV

// export default {
//   trackEvent: (event: string, data?: AnalyticsData) => {
//     console.info("Tracked EVENT on SERVER", event)
//     client.capture({
//       event,
//       properties: { environment, system: 'server', type: 'event', ...data }
//     })
//   },
//   trackError: (event: string, data?: any) => {
//     console.info("Tracked ERROR on SERVER", event)
//     client.capture({
//       event,
//       properties: { environment, system: 'server', type: 'error', ...data }
//     })
//   }
// }
