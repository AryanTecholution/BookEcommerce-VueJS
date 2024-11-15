import { defineStore } from "pinia";

// Define types for product and cart item
interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  // Add other product properties here
}

interface CartItem extends Product {
  quantity: number;
}

// Define the store with TypeScript
export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [] as CartItem[], // Declare `items` as an array of CartItems
  }),
  getters: {
    totalItems: (state) =>
      state.items.reduce((sum, item) => sum + item.quantity, 0),
  },
  actions: {
    addItem(product: Product) {
      const existing = this.items.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        this.items.push({ ...product, quantity: 1 });
      }
    },
    removeItem(id: number) {
      this.items = this.items.filter((item) => item.id !== id);
    },
    increaseQuantity(id: number) {
      const item = this.items.find((item) => item.id === id);
      if (item) item.quantity += 1;
    },
    decreaseQuantity(id: number) {
      const item = this.items.find((item) => item.id === id);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
  },
});
