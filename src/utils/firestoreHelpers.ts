import { DateTime } from 'luxon'

export const toDisplayString = (timestamp: Timestamp|string|null|undefined): string => {
  if (timestamp === null || typeof timestamp === 'undefined') return '---'
  const date = (typeof timestamp === 'string') ? DateTime.fromISO(timestamp) : DateTime.fromSeconds(timestamp.seconds)
  const duration = DateTime.now().diff(date)
  if (duration.toMillis() < 30 * 60000) {
    // less than 30 minutes ago
    return '< 30 min'
  }
  if (duration.toMillis() < 4 * 60 * 60000) {
    // less than 4 hours ago
    return '< 4h'
  }
  return date.toFormat('dd.MM.yyyy – HH:mm')
}