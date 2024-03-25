export function formatIsoDate(isoDate: string) {
  return isoDate.split('-').reverse().join('.')
}

export interface Period {
  start: string
  end: string
}
