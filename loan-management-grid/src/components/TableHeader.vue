<script setup lang="ts">
import { ariaSort, sortColumn, sortDirection, toggleSort } from "../helper";
defineProps<{
  labels: { id: string; value: string }[];
}>();

</script>
<template>
  <tr>
    <th
      v-for="label in labels"
      :key="label.id"
      @click="toggleSort(label.id)"
      :aria-sort="ariaSort(label.id)"
      class="sortable"
    >
      {{ label.value }}
      <span class="sort-icon">
        <span v-if="sortColumn === label.id && sortDirection === 'asc'">▲</span>
        <span v-else-if="sortColumn === label.id && sortDirection === 'desc'">▼</span>
        <span v-else>⇅</span>
      </span>
    </th>
  </tr>
</template>
<style scoped>
.sortable {
  cursor: pointer;
  user-select: none;
  position: sticky;
  top: 0;
  z-index: 10;
  background: #e9ecef;
}

.sort-icon {
  margin-left: 8px;
  font-size: 14px;
  color: #6c757d;
}

th[aria-sort="ascending"] .sort-icon,
th[aria-sort="descending"] .sort-icon {
  color: #000;
}
th{
  padding: 20px;
  background: #e9ecef;
}

</style>