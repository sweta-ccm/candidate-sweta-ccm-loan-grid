export interface Loan {
  id: number
  borrowerName: string
  amount: number
  status: LoanStatus
  closeDate: string
}
export type LoanStatus = "Pending" | "Approved" | "Rejected";
