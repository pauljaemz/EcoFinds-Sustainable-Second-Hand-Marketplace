export type AccountType = 'buyer' | 'seller'

export interface User {
  id: number
  name: string
  email: string
  password: string
  accountType: AccountType
  createdAt: string
}