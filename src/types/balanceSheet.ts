import type { AccountBalance } from './accountBalance'

export interface BalanceSheet {
  date: string
  activus: BalanceSheetSide
  passivus: BalanceSheetSide
}

export interface BalanceSheetSide {
  rows: BalanceSheetRow[]
  total: number
}

interface BalanceSheetRow {
  accountId: number
  balance: AccountBalance
}
