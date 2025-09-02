<script setup lang="ts">
import { useLoanStore } from "../stores/loanStore";
const loanStore = useLoanStore();
</script>
<template>
  <div class="filter-panel">
    <div class="filter-row">
      <div class="filter-group">
        <label for="page-size">Rows per page:</label>
        <select id="page-size" v-model="loanStore.pageSize">
          <option :value="25">25</option>
          <option :value="50">50</option>
          <option :value="100">100</option>
        </select>
      </div>

      <div class="filter-group">
        <label for="status-filter">Status Filter:</label>
        <select id="status-filter" v-model="loanStore.keyword">
          <option value="ALL">ALL</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
    </div>

    <div class="filter-row">
      <div class="filter-group">
        <label>Min Amount:</label>
        <input
          type="number"
          v-model.number="loanStore.minAmount"
          placeholder="e.g. 1000"
        />
      </div>

      <div class="filter-group">
        <label>Max Amount:</label>
        <input
          type="number"
          v-model.number="loanStore.maxAmount"
          placeholder="e.g. 5000"
        />
      </div>
    </div>

    <div class="filter-row">
      <div class="filter-group">
        <label>Close Date From:</label>
        <input type="date" v-model="loanStore.startDate" />
      </div>

      <div class="filter-group">
        <label>To:</label>
        <input type="date" v-model="loanStore.endDate" />
      </div>
    </div>

    <div class="filter-actions">
      <button class="btn btn-primary" @click="loanStore.applyFilters">
        Apply Filters
      </button>
      <button class="btn btn-secondary" @click="loanStore.resetFilters">
        Clear ALL
      </button>
    </div>
  </div>
</template>
<style scoped>

.filter-panel {
  background: #f8f9fa;
  border-bottom: 2px solid #dee2e6;
  padding: 10px 20px 10px 20px;
}

.filter-title {
  margin: 0 0 1rem 0;
  color: #495057;
  font-size: 1.2rem;
  font-weight: 600;
}

.filter-row {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2px;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  flex-direction: column;
  min-width: 150px;
  flex: 1;
}

.filter-group label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #495057;
  font-size: 0.9rem;
}

.filter-group input,
.filter-group select {
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.filter-group input:focus,
.filter-group select:focus {
  outline: none;
  border-color: #80bdff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.filter-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #dee2e6;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #545b62;
}

</style>
