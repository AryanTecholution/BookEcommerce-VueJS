<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <h1 class="text-3xl font-bold mb-8">Checkout</h1>

    <!-- Cart Items -->
    <div class="space-y-6">
      <div
        v-for="item in cartItems"
        :key="item.id"
        class="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center justify-between"
      >
        <!-- Image and Product Info -->
        <div class="flex items-center space-x-6">
          <img
            :src="item.imageUrl"
            alt="Product image"
            class="w-32 h-32 object-cover rounded-lg"
          />
          <div>
            <h3 class="text-xl font-semibold">{{ item.name }}</h3>
            <p class="text-sm text-gray-500">{{ item.type }}</p>
            <p class="text-lg font-bold mt-2">${{ item.price }}</p>
            <p class="text-sm text-gray-500">
              Delivery in {{ item.deliveryDays }} days
            </p>
          </div>
        </div>

        <!-- Quantity and Total -->
        <div class="flex flex-col items-center md:items-end space-y-4">
          <div class="flex items-center">
            <button
              @click="decreaseQuantity(item.id)"
              class="px-3 py-1 bg-gray-200 rounded-l-md hover:bg-gray-300"
              :disabled="item.quantity === 1"
            >
              -
            </button>
            <span class="px-4 py-2 border">{{ item.quantity }}</span>
            <button
              @click="increaseQuantity(item.id)"
              class="px-3 py-1 bg-gray-200 rounded-r-md hover:bg-gray-300"
            >
              +
            </button>
          </div>
          <p class="text-lg font-semibold">
            Total: ${{ (item.quantity * item.price).toFixed(2) }}
          </p>
          <button
            @click="removeItem(item.id)"
            class="text-sm text-red-500 hover:underline"
          >
            Remove
          </button>
        </div>
      </div>
    </div>

    <!-- Summary Section -->
    <div class="mt-8 bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold">Order Summary</h2>
      <div class="mt-4 space-y-2">
        <p class="text-lg">Total Items: {{ totalItems }}</p>
        <p class="text-lg font-semibold">
          Total Amount: ${{ totalAmount.toFixed(2) }}
        </p>
      </div>
      <button
        @click="showModal = true"
        class="mt-6 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        :disabled="isEmpty"
      >
        Confirm Order
      </button>
    </div>

    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 class="text-2xl font-bold mb-4">Enter Details</h2>
        <form @submit.prevent="submitOrder">
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700"
              >Name</label
            >
            <input
              id="name"
              type="text"
              v-model="userName"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div class="mb-4">
            <label for="address" class="block text-sm font-medium text-gray-700"
              >Address</label
            >
            <textarea
              id="address"
              v-model="userAddress"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              rows="3"
              required
            ></textarea>
          </div>
          <div class="flex justify-end space-x-4">
            <button
              type="button"
              @click="showModal = false"
              class="py-2 px-4 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from "../stores/cart";

export default {
  data() {
    return {
      showModal: false,
      userName: "",
      userAddress: "",
    };
  },
  computed: {
    cartItems() {
      const cartStore = useCartStore();
      return cartStore.items;
    },
    totalItems() {
      const cartStore = useCartStore();
      return cartStore.totalItems;
    },
    totalAmount() {
      const cartStore = useCartStore();
      return cartStore.totalAmount;
    },
    isEmpty() {
      const cartStore = useCartStore();
      return cartStore.isEmpty;
    },
  },
  methods: {
    increaseQuantity(id) {
      const cartStore = useCartStore();
      cartStore.increaseQuantity(id);
    },
    decreaseQuantity(id) {
      const cartStore = useCartStore();
      cartStore.decreaseQuantity(id);
    },
    removeItem(id) {
      const cartStore = useCartStore();
      cartStore.removeItem(id);
    },
    submitOrder() {
      const cartStore = useCartStore();
      console.log("Order Details:", {
        name: this.userName,
        address: this.userAddress,
        items: this.cartItems,
        total: this.totalAmount,
      });
      cartStore.clearCart();
      this.showModal = false;
    },
  },
};
</script>

<style scoped>
/* Add any additional styles if needed */
button:disabled {
  background-color: #e2e8f0;
  cursor: not-allowed;
}
</style>
