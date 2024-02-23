export interface Account {
  id?: number
  code: string
  type: AccountType
  name: string
}

export enum AccountType {
  Asset = 'ASSET',
  Liability = 'LIABILITY',
  Equity = 'EQUITY',
  Revenue = 'REVENUE',
  Expense = 'EXPENSE',
  Income = 'INCOME'
}
