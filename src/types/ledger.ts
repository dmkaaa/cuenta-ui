import type { Entry } from './entry'

export interface Ledger {
  subLedgers: SubLedger[]
}

interface SubLedger {
  accountId: number
  openingBalance: number
  closingBalance: number
  entries: Entry[]
  totalDebit: number
  totalCredit: number
}
