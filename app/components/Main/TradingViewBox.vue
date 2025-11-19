<template>
  <div class="relative drag-handle">
    <div class="absolute top-1 right-2 z-50 cursor-pointer">
      <button
        @click="toggleFullscreen"
        class="px-3 py-1 bg-[#0F0F0F] text-white rounded"
      >
        ⛶
      </button>
    </div>

    <div
      class="absolute inset-0 pointer-events-none z-40 rounded-lg border-[#181a20] border-2"
    ></div>

    <div
      id="tv-chart"
      class="relative z-30 !h-[40vh] w-full overflow-hidden rounded-lg"
    ></div>
  </div>
</template>

<script setup>
import { onMounted, watch } from "vue";
import { useRoute } from "#imports";

const route = useRoute();
let tvWidget = null;

onMounted(() => {
  const script = document.createElement("script");
  script.src = "https://s3.tradingview.com/tv.js";

  script.onload = () => {
    tvWidget = new window.TradingView.widget({
      container_id: "tv-chart",
      autosize: true,
      symbol: route.query.symbol || "BINANCE:BTCUSDT",
      interval: "60",
      theme: "dark",

      disabled_features: [
        "symbol_search",
        "header_symbol_search",
        "symbol_info",
        "header_compare",
        "header_screenshot",
        "header_saveload",
        "widgetbar",
      ],
      hide_side_toolbar: false,

      backgroundColor: "#181a20",
      locale: "en",
      style: "1",
      timezone: "Etc/UTC",
    });
  };

  document.body.appendChild(script);
});

watch(
  () => route.query.symbol,
  (symbol) => {
    if (!symbol) return;

    const container = document.getElementById("tv-chart");
    container.innerHTML = "";

    tvWidget = new window.TradingView.widget({
      container_id: "tv-chart",
      autosize: true,
      symbol: symbol,
      interval: "60",
      theme: "dark",

      disabled_features: [
        "symbol_search",
        "header_symbol_search",
        "symbol_info",
        "header_compare",
        "header_screenshot",
        "header_saveload",
        "widgetbar",
      ],

      backgroundColor: "#181a20",
      locale: "en",
      style: "1",
      timezone: "Etc/UTC",
    });
  }
);
</script>

<style scoped>
#tv-chart,
#tv-chart iframe,
#tv-chart > div {
  border: none !important;
  box-shadow: none !important;
  outline: none !important;
}
</style>
