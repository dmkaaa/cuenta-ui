export function formatIsoDate(isoDate: string) {
  return isoDate.split('-').reverse().join('.')
}

export function addDays(date: Date, days: number): Date {
  const copy = new Date(date)
  copy.setDate(copy.getDate() + days)
  return copy
}
