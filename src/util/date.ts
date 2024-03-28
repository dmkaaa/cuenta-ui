export function formatIsoDate(isoDate: string) {
  return isoDate.split('-').reverse().join('.')
}

export function formatPeriod(period: Period) {
  return formatIsoDate(period.start) + ' - ' + formatIsoDate(period.end)
}

export interface Period {
  start: string
  end: string
}
