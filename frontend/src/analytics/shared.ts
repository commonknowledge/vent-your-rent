type node = string | number | boolean | undefined

export interface AnalyticsData {
  /**
   * Category of the event
   */
  category?: node
  /**
   * Human readable name
   */
  label?: node
  [key: string]: node
}
