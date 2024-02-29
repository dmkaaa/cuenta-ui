import type { AccountBalance } from './accountBalance'

export interface BalanceSheet {
  activus: BalanceSheetSide
  passivus: BalanceSheetSide
}

interface BalanceSheetSide {
  rows: BalanceSheetRow[]
  total: number
}

interface BalanceSheetRow {
  accountId: number
  balance: AccountBalance
}
