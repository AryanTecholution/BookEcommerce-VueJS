import { defineStore } from "pinia";

export const useFilterStore = defineStore("filter", {
  state: () => ({
    selectedFilters: {
      priceRange: [0, 100],
      category: "",
      rating: 0,
    },
  }),

  getters: {
    // Get the selected filters from state
    activeFilters: (state) => state.selectedFilters,
  },

  actions: {
    // Update the price range filter
    updatePriceRange(range: number[]) {
      this.selectedFilters.priceRange = range;
    },

    // Update the category filter
    updateCategory(category: string) {
      this.selectedFilters.category = category;
    },

    // Update the rating filter
    updateRating(rating: number) {
      this.selectedFilters.rating = rating;
    },

    // Reset all filters
    resetFilters() {
      this.selectedFilters = { priceRange: [0, 100], category: "", rating: 0 };
    },
  },
});
