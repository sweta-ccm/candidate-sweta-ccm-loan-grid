<script setup lang="ts">
import { computed, ref, onMounted, watch } from "vue";
import { useLoanStore } from "../stores/loanStore";
import { sortColumn, sortDirection } from "../helper";
import TableHeader from "./TableHeader.vue";
import FilterPanel from "./FilterPanel.vue";

const loanStore = useLoanStore();
const loadedPages = ref(1);
const isLoading = ref(false);

onMounted(() => {
  loanStore.loadLoans().then(() => {
    initScrollListener();
  });
});

const visibleLoans = computed(() => {
  return filteredLoans.value.slice(0, loanStore.pageSize * loadedPages.value);
});

const initScrollListener = () => {
  const container = document.querySelector(".table-section");
  if (!container) return;

  container.addEventListener("scroll", () => {
    if (isLoading.value) return;

    const scrollBottom = container.scrollTop + container.clientHeight;
    const threshold = container.scrollHeight - 50;

    if (scrollBottom >= threshold) {
      loadNextPage();
    }
  });
};

const loadNextPage = () => {
  const totalPages = Math.ceil(filteredLoans.value.length / loanStore.pageSize);
  if (loadedPages.value < totalPages) {
    isLoading.value = true;
    setTimeout(() => {
      loadedPages.value++;
      isLoading.value = false;
    }, 300); 
  }
};

watch([() => loanStore.searchTerm, () => loanStore.keyword, 
       () => loanStore.minAmount, () => loanStore.maxAmount,
       () => loanStore.startDate, () => loanStore.endDate], 
  () => {
    loadedPages.value = 1;
});

watch([sortColumn, sortDirection], () => {
  loanStore.sort(sortDirection.value, sortColumn.value);
});
const filteredLoans = computed(() => {
  const term = loanStore.searchTerm.toLowerCase();
  if (!term) return loanStore.getLoanList;

  return loanStore.getLoanList.filter((loan) => {
    return (
      loan.id.toString().toLowerCase().includes(term) ||
      loan.borrowerName.toLowerCase().includes(term) ||
      loan.amount.toString().toLowerCase().includes(term) ||
      loan.status.toLowerCase().includes(term) ||
      loan.closeDate.toLowerCase().includes(term)
    );
  });
});

</script>
<template>
  <div class="loan-table-container">
    <h2>Loan Management Grid</h2>

    <div class="search-container">
      <input
        v-model="loanStore.searchTerm"
        type="text"
        placeholder="Search loans..."
        class="search-input"
      />
    </div>
    
    <FilterPanel/>

    <div class="table-section">
      <table class="loan-table">
        <thead>
          <TableHeader
            :labels="[
              { id: 'id', value: 'ID' },
              { id: 'borrowerName', value: 'Borrower Name' },
              { id: 'amount', value: 'Amount' },
              { id: 'status', value: 'Status' },
              { id: 'closeDate', value: 'Close Date' },
            ]"
          />
        </thead>
        <tbody>
          <tr v-for="loan in visibleLoans" :key="loan.id">
            <td>{{ loan.id }}</td>
            <td>{{ loan.borrowerName }}</td>
            <td>${{ loan.amount.toLocaleString() }}</td>
            <td>
              <span class="status" :class="loan.status.toLowerCase()">
                {{ loan.status }}
              </span>
            </td>
            <td>{{ loan.closeDate }}</td>
          </tr>
        </tbody>
      </table>
      <div v-if="isLoading" class="loader">Loading more...</div>
    </div>
  </div>
</template>

<style scoped>
.loan-table-container {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.loan-table-container h2 {
  color: #495057;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 5px;

}

.search-container {
  padding: 0 1rem;
}

.search-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.search-input:focus {
  outline: none;
  border-color: #80bdff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.table-section {
  max-height: 650px;
  overflow-y: auto;
}

.loader {
  text-align: center;
  padding: 1rem;
  font-weight: 500;
}

.loan-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 18px;
}

.loan-table th {
  text-align: left;
  background: #f8f9fa;
  padding: 12px;
  border-bottom: 2px solid #dee2e6;
  position: sticky;
  top: 0;
  z-index: 1;
}

.loan-table td {
  padding: 12px;
  text-align: center;
  border-bottom: 1px solid #dee2e6;
}

.loan-table tr:hover {
  background: #f1f3f5;
}

.status {
  padding: 4px 8px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 13px;
}

.status.pending {
  background: #fff3cd;
  color: #856404;
}

.status.approved {
  background: #d4edda;
  color: #155724;
}

.status.rejected {
  background: #f8d7da;
  color: #721c24;
}


</style>