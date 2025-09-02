/// <reference types="vitest" />
import { mount, flushPromises } from "@vue/test-utils";
import { sortColumn, sortDirection } from "../helper";
import LoanTable from "../components/LoanTable.vue";
import App from "../App.vue";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useLoanStore } from "../stores/loanStore";

describe("LoanTable.vue & App.vue", () => {
  let wrapper: any;
  let loanStore: any;

  const loansMock = [
    { id: 1, borrowerName: "Alice", amount: 5000, status: "Pending", closeDate: "2025-08-01" },
    { id: 2, borrowerName: "Bob", amount: 3000, status: "Approved", closeDate: "2025-07-15" },
    { id: 3, borrowerName: "Charlie", amount: 5000, status: "Rejected", closeDate: "2025-08-10" },
  ];

  beforeEach(async () => {
    setActivePinia(createPinia());
    loanStore = useLoanStore();

    // Populate reactive state
    loanStore.loanList = [...loansMock];
    loanStore.defaultLoanList = [...loansMock];
    loanStore.pageSize = 2;
    loanStore.searchTerm = "";

    loanStore.loadLoans = vi.fn().mockResolvedValue(true);

    wrapper = mount(LoanTable, {
      global: {
        stubs: ["FilterPanel", "TableHeader"],
      },
    });

    await flushPromises();
  });

    it("App.vue mounts successfully with LoanTable inside", () => {
    const appWrapper = mount(App, {
      global: {
        plugins: [createPinia()],
        stubs: ["LoanTable"],
      },
    });

    expect(appWrapper.exists()).toBe(true);
    expect(appWrapper.findComponent(LoanTable).exists()).toBe(true);
  });
  
  it("mounts FilterPanel and TableHeader components", () => {
    expect(wrapper.findComponent({ name: "FilterPanel" }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: "TableHeader" }).exists()).toBe(true);
  });

  it("sorts loans correctly when header is clicked", async () => {
    loanStore.sort = vi.fn();
    sortColumn.value = "amount";
    sortDirection.value = "asc";

    await wrapper.vm.$nextTick();
    expect(loanStore.sort).toHaveBeenCalledWith("asc", "amount");
  });

  it("filters loans based on search input", async () => {
    const searchInput = wrapper.find(".search-input");
    await searchInput.setValue("Bob");
    await flushPromises();

    expect(wrapper.vm.visibleLoans.length).toBe(1);
    expect(wrapper.vm.visibleLoans[0].borrowerName).toBe("Bob");
  });

  it("resets loadedPages when filter changes", async () => {
    wrapper.vm.loadedPages = 3;
    loanStore.searchTerm = "Alice";
    await flushPromises();
    expect(wrapper.vm.loadedPages).toBe(1);
  });

  it("loads next page when scrolled near bottom", async () => {
    vi.useFakeTimers();

    wrapper.vm.filteredLoans = [...loansMock];
    wrapper.vm.loadedPages = 1;
    wrapper.vm.isLoading = false;

    wrapper.vm.loadNextPage();
    vi.advanceTimersByTime(350);

    expect(wrapper.vm.loadedPages).toBe(2);
    expect(wrapper.vm.isLoading).toBe(false);

    vi.useRealTimers();
  });

  it("does not load next page if already at last page", async () => {
    wrapper.vm.filteredLoans = [...loansMock];
    wrapper.vm.loadedPages = Math.ceil(loansMock.length / loanStore.pageSize);
    wrapper.vm.isLoading = false;

    wrapper.vm.loadNextPage();
    await flushPromises();

    expect(wrapper.vm.loadedPages).toBe(Math.ceil(loansMock.length / loanStore.pageSize));
  });


});
