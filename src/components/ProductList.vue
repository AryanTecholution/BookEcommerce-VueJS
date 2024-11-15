<template>
  <div class="flex flex-col w-full min-h-screen pt-[7.5rem]">
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[4rem] p-4 w-full"
    >
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @add-to-cart="addProductToCart"
        class="transition-transform transform hover:scale-105 shadow-md rounded-lg overflow-hidden bg-white"
      />
    </div>
  </div>
</template>

<script>
import ProductCard from "./ProductCard.vue";
import { useCartStore } from "@/stores/cart";
export default {
  components: {
    ProductCard,
  },
  data() {
    return {
      products: [
        {
          id: 1,
          name: "To Kill a Mockingbird",
          price: 10.99,
          rating: 4.8,
          fastDelivery: true,
          imageUrl: "https://covers.openlibrary.org/b/id/8226191-L.jpg",
          type: "Fiction",
          deliveryDays: 3,
        },

        {
          id: 22,
          name: "Moby-Dick",
          price: 11.49,
          rating: 4.3,
          fastDelivery: true,
          imageUrl: "https://covers.openlibrary.org/b/id/7104438-L.jpg",
          type: "Adventure",
          deliveryDays: 4,
        },
        {
          id: 23,
          name: "War and Peace",
          price: 14.99,
          rating: 4.6,
          fastDelivery: false,
          imageUrl: "https://covers.openlibrary.org/b/id/8670565-L.jpg",
          type: "Historical",
          deliveryDays: 12,
        },
      ],
    };
  },
  methods: {
    addProductToCart(product) {
      const cartStore = useCartStore();
      cartStore.addItem(product);
    },
  },
};
</script>

<style scoped>
/* Any additional styling */
</style>
