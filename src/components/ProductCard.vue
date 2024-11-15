<template>
  <div class="p-4 bg-white rounded-lg shadow-lg">
    <img
      :src="product.imageUrl"
      alt="Product image"
      class="w-full h-48 object-cover rounded-lg"
    />
    <h3 class="text-xl font-semibold mt-4">{{ product.name }}</h3>
    <p class="text-sm text-gray-500">{{ product.type }}</p>
    <p class="text-lg font-bold mt-2">${{ product.price }}</p>
    <p class="text-sm text-yellow-500 mt-2">Rating: {{ product.rating }}</p>
    <p v-if="product.fastDelivery" class="text-sm text-green-500 mt-2">
      Fast Delivery
    </p>
    <p v-else class="text-sm text-red-500 mt-2">
      Delivery in {{ product.deliveryDays }} days
    </p>
    <button
      @click="addToCart"
      class="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg w-full hover:bg-blue-600 transition"
    >
      Add to Cart
    </button>
  </div>
</template>

<script>
export default {
  props: {
    product: Object,
  },
  methods: {
    addToCart() {
      this.$emit("add-to-cart", this.product);
    },
  },
};
</script>

<style scoped>
/* Add any styling needed for the product card */
</style>
