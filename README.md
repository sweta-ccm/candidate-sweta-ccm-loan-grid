# Candidate-sweta-ccm-loan-grid
## Loan Management Grid

A performant, filterable, and sortable loan management grid built with Vue 3, Vite, and Pinia for state management.

## Run, Build, and Test Instructions

### Install dependencies
```bash
npm install
```
### Run the development server
```bash
npm run dev
```
### Build for production
```bash
npm run build
```
### Run tests
```bash
npm run test
```

## Architecture & Performance Notes

- **State Management:**
	- Uses [Pinia](https://pinia.vuejs.org/) for global state management (`loanStore`).
	- All loan data, filters, and sorting state are managed in the store for reactivity and separation of concerns.
- **Filtering & Sorting:**
	- Filters include status, min/max amount, and close date range.
	- Sorting is handled via helper refs and methods, with the store's `sort` action updating the loan list efficiently.
- **Pagination/Virtualization:**
	- Implements infinite scroll by loading more rows as the user scrolls, improving performance for large datasets.
- **Component Structure:**
	- `LoanTable.vue`: Main grid, search, and infinite scroll logic.
	- `FilterPanel.vue`: All filter controls, bound to Pinia store.
	- `TableHeader.vue`: Sortable table headers.
- **Performance Trade-offs:**
	- Index mapping is not used; instead, the filtered/sorted array is sliced for pagination.

## Trade-offs

- **Pinia vs. Vuex:** Pinia is chosen for its simplicity, better TypeScript support, and smaller bundle size.
- **Computed Caching:** Filtering and sorting are only recomputed when relevant state changes, leveraging Vue's computed caching.

## Deviations & Known Issues

- **Deviations:**
	- All filters (status, min/max amount, close date) are optional and can be used in any combination.
	- The store keeps both the current and default loan lists to allow easy reset of filters.
- **Known Issues:**
	- Filtering and sorting are done in-memory; for very large datasets, consider server-side filtering/pagination.
	- No debounce on search/filter input; rapid changes may cause multiple recomputations.
	- Date parsing assumes valid ISO date strings in the data.

## Pinia Usage

- The `loanStore` manages all loan data, filter states, and actions for loading, sorting, and filtering.
- Components interact with the store via `useLoanStore()` and bind UI controls directly to store state for reactivity.
- Actions like `applyFilters`, `resetFilters`, and `sort` encapsulate business logic, keeping components clean.

## Optional Features Implemented
 
- Min/Max amount filter.
- Close date range filter.
