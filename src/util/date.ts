export function formatIsoDate(isoDate: string) {
  return isoDate.split('-').reverse().join('.')
}
