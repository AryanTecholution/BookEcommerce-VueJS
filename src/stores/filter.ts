import { defineStore } from "pinia";
import { PRODUCTS } from "../constants";

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  fastDelivery: boolean;
  imageUrl: string;
  type: string;
  deliveryDays: number;
}

interface ActiveFilters {
  priceRange: [number, number];
  category: string;
  rating: number;
  sorting: "price-asc" | "price-desc" | "rating-asc" | "rating-desc";
}

// Define and export the store
export const useFilterStore = defineStore("filter", {
  state: (): {
    products: Product[];
    activeFilters: ActiveFilters;
    searchQuery: string;
    defaultPriceRange: [number, number];
  } => ({
    products: PRODUCTS,
    activeFilters: {
      priceRange: [0, 100],
      category: "",
      rating: 0,
      sorting: "price-asc",
    },
    searchQuery: "",
    defaultPriceRange: [
      Math.min(...PRODUCTS.map((product) => product.price)),
      Math.max(...PRODUCTS.map((product) => product.price)),
    ],
  }),

  getters: {
    filteredProducts(state): Product[] {
      let filtered = [...state.products];

      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase();
        filtered = filtered.filter((product) =>
          product.name.toLowerCase().includes(query)
        );
      }

      const [minPrice, maxPrice] = state.activeFilters.priceRange;
      const [defaultMin, defaultMax] = state.defaultPriceRange;

      const validMin = Math.max(minPrice, defaultMin);
      const validMax = Math.min(maxPrice, defaultMax);
      if (validMin <= validMax) {
        filtered = filtered.filter(
          (product) => product.price >= validMin && product.price <= validMax
        );
      }

      if (state.activeFilters.category) {
        filtered = filtered.filter(
          (product) =>
            product.type.toLowerCase() ===
            state.activeFilters.category.toLowerCase()
        );
      }

      if (state.activeFilters.rating > 0) {
        filtered = filtered.filter(
          (product) => product.rating >= state.activeFilters.rating
        );
      }

      switch (state.activeFilters.sorting) {
        case "price-asc":
          filtered.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          filtered.sort((a, b) => b.price - a.price);
          break;
        case "rating-asc":
          filtered.sort((a, b) => a.rating - b.rating);
          break;
        case "rating-desc":
          filtered.sort((a, b) => b.rating - a.rating);
          break;
      }

      return filtered;
    },
  },

  actions: {
    updatePriceRange(range: [number, number]) {
      const [defaultMin, defaultMax] = this.defaultPriceRange;
      const validMin = Math.max(range[0], defaultMin);
      const validMax = Math.min(range[1], defaultMax);

      if (validMin <= validMax) {
        this.activeFilters.priceRange = [validMin, validMax];
      } else {
        console.warn("Invalid price range provided. Update ignored.");
      }
    },

    updateCategory(category: string) {
      this.activeFilters.category = category.trim();
    },

    updateRating(rating: number) {
      if (rating >= 0 && rating <= 5) {
        this.activeFilters.rating = rating;
      } else {
        console.warn("Invalid rating provided. Update ignored.");
      }
    },

    updateSorting(
      sorting: "price-asc" | "price-desc" | "rating-asc" | "rating-desc"
    ) {
      this.activeFilters.sorting = sorting;
    },

    setProducts(products: Product[]) {
      this.products = products;

      this.defaultPriceRange = [
        Math.min(...products.map((product) => product.price)),
        Math.max(...products.map((product) => product.price)),
      ];
    },

    updateSearchQuery(query: string) {
      this.searchQuery = query.trim().toLowerCase();
    },
  },
});
