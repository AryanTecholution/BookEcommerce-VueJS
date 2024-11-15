<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-end items-start pt-[5rem] z-[101]"
  >
    <div
      class="bg-white dark:bg-gray-800 dark:text-gray-100 p-6 rounded-lg shadow-lg w-[30%] max-h-[80%] overflow-y-auto"
    >
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-bold">Your Cart</h3>
        <button
          @click="$emit('close')"
          class="text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
        >
          ✖
        </button>
      </div>

      <div v-if="cartItems.length > 0">
        <div
          v-for="item in cartItems"
          :key="item.id"
          class="flex justify-between items-center mb-4 border-b pb-2"
        >
          <img
            :src="item.imageUrl"
            alt="Product Image"
            class="w-16 h-16 object-cover rounded-lg"
          />
          <div class="flex-1 ml-4 flex flex-col justify-between">
            <!-- Product Name -->
            <h4 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {{ item.name }}
            </h4>

            <!-- Product Price -->
            <p class="text-xl font-semibold text-gray-800 dark:text-gray-200">
              ${{ item.price }}
            </p>

            <!-- Quantity Section -->
            <div class="flex items-center space-x-4 mt-4">
              <!-- Decrease Button -->
              <button
                @click="decreaseQuantity(item.id)"
                class="w-8 h-8 bg-gray-200 hover:bg-gray-300 text-xl font-bold text-gray-700 rounded-full transition duration-300 ease-in-out"
              >
                -
              </button>

              <!-- Quantity Display -->
              <span
                class="text-lg font-medium text-gray-700 dark:text-gray-300"
                >{{ item.quantity }}</span
              >

              <!-- Increase Button -->
              <button
                @click="increaseQuantity(item.id)"
                class="w-8 h-8 bg-gray-200 hover:bg-gray-300 text-xl font-bold text-gray-700 rounded-full transition duration-300 ease-in-out"
              >
                +
              </button>
            </div>

            <!-- Optional: More Info Section or Add to Cart Button -->
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Quantity: {{ item.quantity }}
            </p>
          </div>

          <button
            @click="removeFromCart(item.id)"
            class="text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
        <button
          @click="proceedToCheckout"
          class="w-full py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Proceed to Checkout
        </button>
      </div>
      <p v-else class="text-gray-500 dark:text-gray-400">Your cart is empty.</p>
    </div>
  </div>
</template>

<script>
import { useCartStore } from "../stores/cart";

export default {
  name: "CartPopup",
  computed: {
    cartItems() {
      const cartStore = useCartStore();
      return cartStore.items;
    },
  },
  methods: {
    removeFromCart(id) {
      const cartStore = useCartStore();
      cartStore.removeItem(id);
    },
    increaseQuantity(id) {
      const cartStore = useCartStore();
      cartStore.increaseQuantity(id);
    },
    decreaseQuantity(id) {
      const cartStore = useCartStore();
      cartStore.decreaseQuantity(id);
    },
    proceedToCheckout() {
      this.$router.push("/checkout");
    },
  },
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
