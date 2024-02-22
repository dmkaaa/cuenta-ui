export function formatMoney(amount: number) {
  return amount.toFixed(2)
}

export function range(startInclusive: number, endInclusive: number): number[] {
  const size = endInclusive - startInclusive + 1
  return Array.from(Array(size).keys())
    .map((item) => startInclusive + item)
    .sort()
}
