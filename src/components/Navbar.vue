<template>
  <nav
    class="z-[100] fixed h-[5rem] w-screen bg-gray-800 text-white px-4 py-3 flex items-center justify-between shadow-md"
  >
    <div class="flex items-center space-x-2">
      <span @click="proceedToHome" class="cursor-pointer text-2xl font-bold"
        >BookShop</span
      >
    </div>

    <div class="flex w-[50%] justify-end items-center gap-8">
      <div class="flex-1 mx-4">
        <input
          type="text"
          placeholder="Search a product"
          v-model="searchQuery"
          @input="handleSearch"
          class="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
        />
      </div>

      <div class="flex items-center space-x-6 justify-center gap-6 pr-8">
        <div class="relative">
          <button
            @click="toggleCartPopup"
            class="text-white focus:outline-none"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0L3 6m4 7v10a2 2 0 002 2h8a2 2 0 002-2V13m-6 6h.01M13 19h.01"
              />
            </svg>
          </button>
          <span
            class="absolute -top-2 -right-2 bg-red-500 text-xs font-bold text-white rounded-full px-1"
            >{{ cartItemCount }}</span
          >
        </div>
      </div>
    </div>

    <CartPopup v-if="showCartPopup" @close="toggleCartPopup" />
  </nav>
</template>

<script>
import { useCartStore } from "../stores/cart";
import { useFilterStore } from "../stores/filter";
import CartPopup from "./CartPopup.vue";

export default {
  name: "Navbar",
  components: {
    CartPopup,
  },
  data() {
    return {
      showCartPopup: false,
    };
  },
  computed: {
    cartItemCount() {
      const cartStore = useCartStore();
      return cartStore.totalItems;
    },
    searchQuery: {
      get() {
        const filterStore = useFilterStore();
        return filterStore.searchQuery;
      },
      set(value) {
        const filterStore = useFilterStore();
        filterStore.updateSearchQuery(value);
      },
    },
  },
  methods: {
    toggleCartPopup() {
      this.showCartPopup = !this.showCartPopup;
    },
    handleSearch() {},
    proceedToHome() {
      this.$router.push("/");
    },
  },
};
</script>
