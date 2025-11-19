// stores/futures.js
import { defineStore } from "pinia";

export const useFuturesStore = defineStore("futures", {
  state: () => ({
    price: 0,
  }),
  actions: {
    setPrice(value) {
      this.price = value;
    },
    getPrice() {
      return this.price;
    },
  },
});
