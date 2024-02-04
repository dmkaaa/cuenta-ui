import type { Account } from './account'

export interface EntryRequest {
  debitAccountId: number
  creditAccountId: number
  amount: string
  date: string
  description: string
}

export interface EntryResponse {
  id: number
  debitAccount: Account
  creditAccount: Account
  amount: string
  date: string
  description: string
}
