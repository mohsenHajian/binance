<template>
  <div
    class="box h-[56px] bg-gray-800 text-white px-4 rounded-md mx-auto text-[12px] flex items-center !m-0"
  >
    <div class="flex items-center gap-2 mb-2 cursor-default">
      <img :src="iconUrl" class="w-6 h-6" />
      <h2 class="font-semibold text-[20px]">
        {{ symbol || "BNBUSDT" }}
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
        class="text-xl leading-normal transition-colors font-mono inline-block min-w-[100px] text-left"
        :class="[
          priceTrend === 'up'
            ? 'text-[#2EBD85]'
            : priceTrend === 'down'
            ? 'text-[#F6465D]'
            : 'text-[#F6465D]',
        ]"
      >
        {{ perpPrice?.toLocaleString() ?? "..." }}
      </span>

      <div class="flex items-center gap-2 font-mono">
        <span
          class="inline-block min-w-[60px] text-left"
          :class="change >= 0 ? 'text-[#2EBD85]' : 'text-[#F6465D]'"
        >
          {{ change?.toLocaleString() ?? "..." }}
        </span>
        <span
          class="inline-block min-w-[65px] text-left"
          :class="changePercent >= 0 ? 'text-[#2EBD85]' : 'text-[#F6465D]'"
        >
          ({{ changePercent?.toFixed(2) ?? "..." }}%)
        </span>
      </div>
    </div>

    <div class="flex flex-wrap gap-2 text-[12px] cursor-default">
      <InfoItem label="Mark" :value="markPrice.toFixed(2)" />
      <InfoItem label="Index" :value="indexPrice.toFixed(2)" />
      <InfoItem label="Funding (8h) / Countdown" :value="fundingRateDisplay" />
      <InfoItem label="24h High" :value="high24h" />
      <InfoItem label="24h Low" :value="low24h" />
      <InfoItem label="Volume (BTC)" :value="volumeBTC.toFixed(2)" />
      <InfoItem label="Volume (USDT)" :value="volumeUSDT.toFixed(2)" />
      <InfoItem label="Open Interest (USDT)" :value="openInterestUSDT" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useRoute } from "#imports";
import { useFuturesDetails } from "../../composable/useFuturesDetails";
import InfoItem from "../utils/InfoItem.vue";

const route = useRoute();
const querySymbol = ref("BTCUSDT");

onMounted(() => {
  if (route && route.query && route.query.symbol) {
    querySymbol.value = route.query.symbol;
  }
});

watch(
  () => route.query?.symbol,
  (newVal) => {
    if (newVal) querySymbol.value = newVal;
  }
);

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
} = useFuturesDetails(querySymbol);

const prevPrice = ref(null);
const priceTrend = ref("neutral");

watch(perpPrice, (val) => {
  if (prevPrice.value !== null) {
    priceTrend.value =
      val > prevPrice.value ? "up" : val < prevPrice.value ? "down" : "neutral";
  }
  prevPrice.value = val;
});

const fundingRateDisplay = computed(() =>
  fundingRate.value != null && fundingCountdownFormatted.value != null
    ? `${fundingRate.value.toFixed(5)}% / ${fundingCountdownFormatted.value}`
    : "..."
);

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

/* اعداد بدون پرش */
* {
  font-feature-settings: "tnum";
}
</style>
