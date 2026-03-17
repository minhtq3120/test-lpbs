import type { LoanRow } from "@/types/loan"
import BigNumber from "bignumber.js";

export type CaculateLoanResponse = {
    result:  LoanRow[]
    totalPay: number
    totalInterestPay: number
}

export function calculateLoan(
  amount: string,
  term: number,
  rate: number
): CaculateLoanResponse {

    const monthlyPrincipal = new BigNumber(amount).dividedBy(term)
    const monthlyRate = new BigNumber(rate).dividedBy(12).dividedBy(100)
    
    let totalPay = new BigNumber(0);
    let totalInterestPay = new BigNumber(0);
    let remaining = new BigNumber(amount)

    const result: LoanRow[] = []

    for (let i = 1; i <= term; i++) {

        const interest = remaining.multipliedBy(monthlyRate);
        const payment = monthlyPrincipal.plus(interest)

        totalInterestPay = totalInterestPay.plus(interest);
        totalPay = totalPay.plus(payment)

        remaining = remaining.minus(monthlyPrincipal);

        result.push({
            month: i,
            principal: monthlyPrincipal.toNumber(),
            interest: interest.toNumber(),
            payment: payment.toNumber(),
            remaining: remaining.toNumber()
        })
    }

    return {
        result, 
        totalPay: totalPay.toNumber(),
        totalInterestPay: totalInterestPay.toNumber()
    }
}