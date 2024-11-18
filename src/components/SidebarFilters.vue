<template>
  <div
    class="fixed top-0 pt-[7.5rem] w-[20%] left-0 h-full p-4 bg-gray-800 text-white shadow-md z-10"
  >
    <h2 class="text-xl font-semibold mb-4">Filter Products</h2>

    <!-- Price Range Slider -->
    <div class="mb-6">
      <label class="block text-sm font-medium mb-2">
        Price Range: ${{ priceRange[0] }} - ${{ priceRange[1] }}
      </label>
      <input
        type="range"
        :min="defaultPriceRange[0]"
        :max="defaultPriceRange[1]"
        :value="priceRange[1]"
        @input="updatePriceRange($event.target.value, 1)"
        class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
      />
      <input
        type="range"
        :min="defaultPriceRange[0]"
        :max="defaultPriceRange[1]"
        :value="priceRange[0]"
        @input="updatePriceRange($event.target.value, 0)"
        class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer mt-2"
      />
    </div>

    <!-- Category Filter -->
    <div class="mb-4">
      <label for="category" class="block text-sm font-medium">Category</label>
      <select
        id="category"
        v-model="category"
        @change="updateCategory"
        class="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white"
      >
        <option value="">All</option>
        <option
          v-for="category in categories"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>
    </div>

    <!-- Rating Filter -->
    <div class="mb-4">
      <label for="rating" class="block text-sm font-medium">Rating</label>
      <input
        type="number"
        id="rating"
        v-model.number="rating"
        @input="updateRating"
        min="1"
        max="5"
        class="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white"
      />
    </div>

    <!-- Sorting Options -->
    <div class="mb-4">
      <label for="sorting" class="block text-sm font-medium">Sort By</label>
      <select
        id="sorting"
        v-model="sorting"
        @change="updateSorting"
        class="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white"
      >
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating-asc">Rating: Low to High</option>
        <option value="rating-desc">Rating: High to Low</option>
      </select>
    </div>
  </div>
</template>

<script>
import { useFilterStore } from "../stores/filter";

export default {
  computed: {
    filterStore() {
      return useFilterStore();
    },
    priceRange: {
      get() {
        return this.filterStore.activeFilters.priceRange;
      },
      set(range) {
        this.filterStore.updatePriceRange(range);
      },
    },
    defaultPriceRange() {
      return this.filterStore.defaultPriceRange;
    },
    categories() {
      return [
        ...new Set(this.filterStore.products.map((product) => product.type)),
      ];
    },
    category: {
      get() {
        return this.filterStore.activeFilters.category;
      },
      set(value) {
        this.filterStore.updateCategory(value);
      },
    },
    rating: {
      get() {
        return this.filterStore.activeFilters.rating;
      },
      set(value) {
        this.filterStore.updateRating(value);
      },
    },
    sorting: {
      get() {
        return this.filterStore.activeFilters.sorting;
      },
      set(value) {
        this.filterStore.updateSorting(value);
      },
    },
  },
  methods: {
    updatePriceRange(value, index) {
      const updatedRange = [...this.priceRange];
      updatedRange[index] = parseInt(value);
      updatedRange.sort((a, b) => a - b); // Ensure min <= max
      this.priceRange = updatedRange;
    },
  },
};
</script>

<style scoped>
/* Styling for the slider */
input[type="range"] {
  appearance: none;
  width: 100%;
  height: 2px;
  background: #374151;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  transition: background 0.3s ease;
}
input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #10b981;
  cursor: pointer;
}
input[type="range"]::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #10b981;
  cursor: pointer;
}
</style>
