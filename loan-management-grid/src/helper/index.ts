import { ref } from "vue";

export const sortColumn = ref<string | null>(null);
export const sortDirection = ref<"asc" | "desc" | null>(null);

export function toggleSort(column: string) {
  if (sortColumn.value !== column) {
    sortColumn.value = column;
    sortDirection.value = "asc";
  } else {
    if (sortDirection.value === "asc") sortDirection.value = "desc";
    else if (sortDirection.value === "desc") {
      sortDirection.value = null;
      sortColumn.value = null;
    } else sortDirection.value = "asc";
  }
}

export function ariaSort(column: string) {
  if (sortColumn.value !== column) return "none";
  return sortDirection.value === "asc" ? "ascending" :
    sortDirection.value === "desc" ? "descending" : "none";
}

