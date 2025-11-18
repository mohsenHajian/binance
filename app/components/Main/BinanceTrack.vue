<template>
  <div
    v-if="visible"
    class="box relative"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <div class="flex items-center !justify-start h-9 px-4 gap-2">
      <div
        v-for="symbolItem in symbols"
        :key="symbolItem"
        class="flex gap-1 text-xs min-w-[100px]"
      >
        <span
          class="text-white font-normal hover:text-gray-400 transition-all cursor-pointer"
          @click="changeSymbol(symbolItem)"
        >
          {{ symbolItem }}
        </span>
        <span
          class="font-normal"
          :style="{ color: tickers[symbolItem]?.color }"
        >
          {{
            tickers[symbolItem]?.changePercent !== undefined
              ? tickers[symbolItem].changePercent.toFixed(2)
              : "..."
          }}%
        </span>
      </div>
    </div>

    <svg
      v-if="hover"
      @click="visible = false"
      class="w-4 opacity-[0.5] cursor-pointer absolute top-0 right-0 z-10"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm3.637 6.363a.9.9 0 00-1.274 0L12 10.727 9.637 8.363l-.069-.061a.9.9 0 00-1.266 1.266l.061.069L10.727 12l-2.364 2.363a.9.9 0 001.274 1.274L12 13.273l2.363 2.364.069.061a.9.9 0 001.266-1.266l-.061-.069L13.273 12l2.364-2.363a.9.9 0 000-1.274z"
        fill="currentColor"
      ></path>
    </svg>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useBinanceTickers } from "../../composable/useBinanceTicker";

const props = defineProps({
  symbol: { type: String, default: "BTCUSDT" },
});
const emit = defineEmits(["update:symbol"]);

const symbols = ["BTCUSDT", "ETHUSDT", "BNBUSDT"];
const { tickers } = useBinanceTickers(symbols);

const hover = ref(false);
const visible = ref(true);

const changeSymbol = (newSymbol) => {
  emit("update:symbol", newSymbol);
};
</script>
