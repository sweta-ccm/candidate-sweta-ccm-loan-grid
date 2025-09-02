import { defineStore } from "pinia";
import type { Loan } from "../types/loan";
import loanData from "../../data/loans.json";

const typedLoanData = loanData as Loan[];
export const useLoanStore = defineStore("loans", {
  state: () => ({
    loanList: [] as Loan[],
    defaultLoanList: [] as Loan[],
    pageSize:25,
    keyword: "ALL" as string,
    minAmount: null as number | null,
    maxAmount: null as number | null,
    startDate: null as string | null,
    endDate: null as string | null,
    searchTerm: "" as string,
    showError: false
    
  }),

  getters: {
    getLoanList: (state) => state.loanList
  },

  actions: {
    async loadLoans() {
      try {
        this.loanList = typedLoanData.map((loan) => ({
          ...loan,
          status: loan.status as Loan["status"]
        }));
        this.defaultLoanList = this.loanList
      } catch (e) {
        this.showError = true;
      }
    },
    sort(sortOrder: string | null, sortColumn: string | null) {
      console.log('without out sort', this.loanList);
      console.log('sortOrder', sortColumn);
      console.log('sortColumn', sortColumn);
      if (sortOrder === null || sortColumn === null) {
        console.log('Resetting to defaultLoanList');
        this.loanList = [...this.defaultLoanList];
        return;
      }
      const compare = (a: any, b: any) => {
        if (a === b) return 0;
        if (typeof a === 'string' && typeof b === 'string') {
          return a.localeCompare(b);
        }
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      };

      this.loanList = [...this.loanList].sort((a, b) => {
        let valA = a[sortColumn as keyof Loan];
        let valB = b[sortColumn as keyof Loan];

        if (sortColumn === 'closeDate') {
          valA = new Date(valA as string).getTime();
          valB = new Date(valB as string).getTime();
        } else if (sortColumn === 'amount' || sortColumn === 'id') {
          valA = Number(valA);
          valB = Number(valB);
        }

        const order = compare(valA, valB);
        return sortOrder === 'asc' ? order : -order;
      });
      console.log('after sort', this.loanList);
    },
    applyFilters() {
      this.loanList = this.defaultLoanList.filter((loan: Loan) => {
        const matchesStatus =
          this.keyword === "ALL" || loan.status === this.keyword;

        const matchesAmount =
          (this.minAmount === null || loan.amount >= this.minAmount) &&
          (this.maxAmount === null || loan.amount <= this.maxAmount);

        const loanDate = new Date(loan.closeDate);
        const matchesDate =
          (!this.startDate || loanDate >= new Date(this.startDate)) &&
          (!this.endDate || loanDate <= new Date(this.endDate));

        return (
          matchesStatus && matchesAmount && matchesDate 
        );
      });
    },
    resetFilters(){
      this.loanList = this.defaultLoanList
      this.keyword= "ALL" 
    this.minAmount= null 
    this.maxAmount= null 
    this.startDate= null 
    this.endDate= null 
    }
  }
});
