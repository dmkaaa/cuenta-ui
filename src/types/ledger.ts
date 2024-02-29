import type { AccountBalance } from './accountBalance'
import type { Entry } from './entry'

export interface Ledger {
  subLedgers: SubLedger[]
}

interface SubLedger {
  accountId: number
  openingBalance: AccountBalance
  balance: AccountBalance
  closingBalance: AccountBalance
  entries: Entry[]
}
