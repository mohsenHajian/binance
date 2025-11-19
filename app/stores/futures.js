// stores/futures.js
import { defineStore } from "pinia";

export const useFuturesStore = defineStore("futures", {
  state: () => ({
    price: 0,
    realTimePrice: 0,
  }),
  actions: {
    setPrice(value) {
      this.price = value;
    },
    setRealTimePrice(value) {
      this.realTimePrice = value;
    },
    getPrice() {
      return this.price;
    },
    geRealTimePrice() {
      return this.realTimePrice;
    },
  },
});
