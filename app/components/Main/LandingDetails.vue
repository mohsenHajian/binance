<template>
  <div
    class="box h-[56px] bg-gray-800 text-white px-4 rounded-md mx-auto text-[12px] flex items-center"
  >
    <div class="flex items-center gap-2 mb-2 cursor-default">
      <img :src="iconUrl" class="w-6 h-6" />
      <h2 class="font-semibold text-[20px]">
        {{ route?.query?.symbol || "BNBUSDT" }}
      </h2>
      <span
        class="py-0.5 px-0.5 bg-[#29313D] rounded-[2px] text-[10px] relative -top-0.5"
        >Perp</span
      >
      <svg
        class="text-gray-500 w-4 relative -top-0.5 -left-1"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.37 8.75H7.63a.75.75 0 00-.569 1.238l4.37 5.098c.299.349.84.349 1.138 0l4.37-5.098a.75.75 0 00-.57-1.238z"
          fill="currentColor"
        />
      </svg>
    </div>

    <div class="flex flex-col items-center mx-4 relative -top-1 cursor-default">
      <span
        class="text-xl leading-normal transition-all"
        :class="[
          priceTrend === 'up'
            ? 'text-[#2EBD85]'
            : priceTrend === 'down'
            ? 'text-[#F6465D]'
            : 'text-white',
        ]"
      >
        {{ perpPrice?.toLocaleString() ?? "..." }}
      </span>

      <div class="flex items-center gap-2">
        <span :class="change >= 0 ? 'text-[#2EBD85]' : 'text-[#F6465D]'">
          {{ change?.toLocaleString() ?? "..." }}
        </span>
        <span :class="changePercent >= 0 ? 'text-[#2EBD85]' : 'text-[#F6465D]'">
          ({{ changePercent?.toFixed(2) ?? "..." }}%)
        </span>
      </div>
    </div>

    <div class="flex flex-wrap gap-2 text-[12px] cursor-default">
      <div class="flex flex-col font-normal gap-2">
        <span class="text-[#707A8A] hover:text-white transition-all text-xs"
          >Mark</span
        >
        <span>{{ markPrice?.toLocaleString() ?? "..." }}</span>
      </div>
      <div class="flex flex-col font-normal gap-2">
        <span class="text-[#707A8A] hover:text-white transition-all text-xs"
          >Index</span
        >
        <span>{{ indexPrice?.toLocaleString() ?? "..." }}</span>
      </div>
      <div class="flex flex-col mb-2 font-normal gap-2">
        <span class="text-[#707A8A] hover:text-white transition-all text-xs"
          >Funding (8h) / Countdown</span
        >
        <span>
          {{ fundingRate?.toFixed(5) ?? "..." }}% /
          {{ fundingCountdownFormatted ?? "..." }}
        </span>
      </div>
      <div class="flex flex-col font-normal gap-2">
        <span class="text-[#707A8A] hover:text-white transition-all text-xs"
          >24h High</span
        >
        <span>{{ high24h?.toLocaleString() ?? "..." }}</span>
      </div>
      <div class="flex flex-col font-normal gap-2">
        <span class="text-[#707A8A] hover:text-white transition-all text-xs"
          >24h Low</span
        >
        <span>{{ low24h?.toLocaleString() ?? "..." }}</span>
      </div>
      <div class="flex flex-col font-normal gap-2">
        <span class="text-[#707A8A] hover:text-white transition-all text-xs"
          >Volume (BTC)</span
        >
        <span>{{ volumeBTC?.toLocaleString() ?? "..." }}</span>
      </div>
      <div class="flex flex-col font-normal gap-2">
        <span class="text-[#707A8A] hover:text-white transition-all text-xs"
          >Volume (USDT)</span
        >
        <span>{{ volumeUSDT?.toLocaleString() ?? "..." }}</span>
      </div>
      <div class="flex flex-col font-normal gap-2">
        <span class="text-[#707A8A] hover:text-white transition-all text-xs"
          >Open Interest (USDT)</span
        >
        <span>{{ openInterestUSDT?.toLocaleString() ?? "..." }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useFuturesDetails } from "../../composable/useFuturesDetails";

const route = useRoute();
const {
  symbol,
  perpPrice,
  change,
  changePercent,
  markPrice,
  indexPrice,
  fundingRate,
  fundingCountdownFormatted,
  high24h,
  low24h,
  volumeBTC,
  volumeUSDT,
  openInterestUSDT,
} = useFuturesDetails(route?.query?.symbol || "BTCUSDT");

const prevPrice = ref(null);
const priceTrend = ref("neutral");

watch(perpPrice, (val) => {
  if (prevPrice.value !== null) {
    if (val > prevPrice.value) priceTrend.value = "up";
    else if (val < prevPrice.value) priceTrend.value = "down";
    else priceTrend.value = "neutral";
  }
  prevPrice.value = val;
});

const iconUrl = computed(() => {
  const map = { btc: 1, eth: 1027, bnb: 1839 };
  const s = symbol.value.replace("USDT", "").toLowerCase();
  const coinId = map[s] || 1;
  return `https://s2.coinmarketcap.com/static/img/coins/64x64/${coinId}.png`;
});
</script>

<style scoped>
.box {
  font-size: 12px;
}
</style>
