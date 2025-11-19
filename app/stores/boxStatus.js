import { defineStore } from "pinia";

export const useBoxStatus = defineStore("boxStatus", {
  state: () => ({
    isOrderBookVisible: true,
  }),
  actions: {
    setIsOrderBookVisible(value) {
      this.isOrderBookVisible = value;
    },
    getIsOrderBookVisible() {
      return this.isOrderBookVisible;
    },
  },
});
