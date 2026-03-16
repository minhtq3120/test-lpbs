export type LoanRow = {
  month: number
  principal: number
  interest: number
  payment: number
  remaining: number
}

export type LoadFormData = {
  amount: string
  term: number
  rate: number
}