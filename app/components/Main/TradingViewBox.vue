<template>
  <div class="relative drag-handle">
    <div class="absolute top-1 right-1 z-50 cursor-pointer">
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
      class="relative z-30 w-full min-h-[40vh] overflow-hidden rounded-lg"
    ></div>
  </div>
</template>

<script setup>
import { onMounted, watch, ref } from "vue";
import { useRoute } from "#imports";

const route = useRoute();
const tvWidget = ref(null);

const initTradingView = (symbol) => {
  const container = document.getElementById("tv-chart");
  container.innerHTML = "";
  tvWidget.value = new window.TradingView.widget({
    container_id: "tv-chart",
    autosize: true,
    symbol: symbol || "BINANCE:BTCUSDT",
    interval: "60",
    theme: "dark",
    style: "1",
    timezone: "Etc/UTC",
    locale: "en",
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
  });
};

onMounted(() => {
  const script = document.createElement("script");
  script.src = "https://s3.tradingview.com/tv.js";
  script.onload = () => {
    initTradingView(route.query.symbol);
  };
  document.body.appendChild(script);
});

watch(
  () => route.query.symbol,
  (symbol) => {
    if (!symbol) return;
    if (window.TradingView) {
      initTradingView(symbol);
    }
  }
);

const toggleFullscreen = () => {
  const elem = document.getElementById("tv-chart");
  if (!document.fullscreenElement) {
    elem.requestFullscreen().catch((err) => {
      console.warn(
        `Error attempting to enable full-screen mode: ${err.message}`
      );
    });
  } else {
    document.exitFullscreen();
  }
};
</script>

<style scoped>
#tv-chart,
#tv-chart iframe,
#tv-chart > div {
  border: none !important;
  box-shadow: none !important;
  outline: none !important;
  height: 100% !important;
  width: 100% !important;
}
</style>
