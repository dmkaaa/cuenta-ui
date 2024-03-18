export function chunk<T>(arr: T[], n: number): T[][] {
  const result: T[][] = []
  const i = 0
  while (arr.length > 0) {
    result.push(arr.splice(i * n, n))
  }
  return result
}
