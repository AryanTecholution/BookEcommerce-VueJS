import { defineStore } from "pinia";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  type: string;
  deliveryDays: number;
}

interface CartItem extends Product {
  quantity: number;
}

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: JSON.parse(localStorage.getItem("cartItems") || "[]") as CartItem[],
  }),

  getters: {
    totalItems: (state) =>
      state.items.reduce((sum, item) => sum + item.quantity, 0),

    totalAmount: (state) =>
      state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),

    isEmpty: (state) => state.items.length === 0,
  },

  actions: {
    addItem(product: Product) {
      const existing = this.items.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        this.items.push({ ...product, quantity: 1 });
      }
      this.saveCart();
    },

    removeItem(id: number) {
      this.items = this.items.filter((item) => item.id !== id);
      this.saveCart();
    },

    increaseQuantity(id: number) {
      const item = this.items.find((item) => item.id === id);
      if (item) item.quantity += 1;
      this.saveCart();
    },

    decreaseQuantity(id: number) {
      const item = this.items.find((item) => item.id === id);
      if (item && item.quantity > 1) item.quantity -= 1;
      this.saveCart();
    },

    clearCart() {
      this.items = [];
      this.saveCart();
    },

    saveCart() {
      localStorage.setItem("cartItems", JSON.stringify(this.items));
    },
  },
});
