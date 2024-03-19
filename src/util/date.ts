export function formatIsoDate(isoDate: string) {
  return isoDate.split('-').reverse().join('.')
}

export function addDays(date: Date, days: number): Date {
  const copy = new Date(date)
  copy.setDate(copy.getDate() + days)
  return copy
}

export function addMonths(date: Date, months: number): Date {
  const copy = new Date(date)
  copy.setMonth(copy.getMonth() + months)
  return copy
}

export function addYears(date: Date, years: number): Date {
  const copy = new Date(date)
  copy.setFullYear(copy.getFullYear() + years)
  return copy
}
