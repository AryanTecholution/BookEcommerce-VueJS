<template>
  <div class="flex flex-col w-full min-h-screen pt-[7.5rem]">
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[4rem] p-4 w-full"
    >
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        class="transition-transform transform hover:scale-105 shadow-md rounded-lg overflow-hidden bg-white"
      />
    </div>
  </div>
</template>

<script>
import { useFilterStore } from "../stores/filter"; // Import the filter store
import ProductCard from "./ProductCard.vue"; // Import the ProductCard component
import { PRODUCTS } from "../constants"; // Import the static products data

export default {
  components: {
    ProductCard,
  },

  computed: {
    // Get active filters from the store
    activeFilters() {
      const filterStore = useFilterStore();
      return filterStore.activeFilters;
    },

    // Get filtered products from the store (will be reactive)
    filteredProducts() {
      const filterStore = useFilterStore();
      return filterStore.filteredProducts;
    },
  },

  created() {
    const filterStore = useFilterStore();
    // Set the products in the store only once during component creation
    filterStore.setProducts(PRODUCTS);
  },
};
</script>

<style scoped>
/* Add any additional styles if necessary */
</style>
