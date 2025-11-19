<template>
  <div
    class="box h-fit py-4 md:my-0 md:h-[56px] drag-handle text-white px-4 rounded-md mx-auto text-[12px] flex items-center justify-between md:justify-start !m-0 overflow-hidden relative w-full"
  >
    <div class="flex md:flex-row flex-col items-center">
      <div class="flex items-center gap-2 mb-2 cursor-default">
        <img
          v-if="iconUrl"
          :src="iconUrl || ''"
          class="w-6 h-6 hidden md:flex"
        />
        <img
          v-else
          src="../../assets/img/coin.png"
          class="w-6 h-6 hidden md:flex"
        />
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

      <div
        class="flex flex-col items-center mx-4 relative -top-1 cursor-default"
      >
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
        <div
          v-if="showScrollLeft"
          @click="scrollLeft"
          class="hidden md:flex h-full items-center justify-center scroll-btn px-3 absolute top-[61%] -right-9 -translate-y-1/2 z-10"
        >
          <svg
            class="text-white rotate-[180deg] opacity-[0.7]"
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="24"
            viewBox="0 0 12 24"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M10.157 12.711L4.5 18.368l-1.414-1.414l4.95-4.95l-4.95-4.95L4.5 5.64l5.657 5.657a1 1 0 0 1 0 1.414"
            />
          </svg>
        </div>
      </div>
    </div>

    <div
      ref="scrollContainer"
      class="relative md:grow max-w-[720px] overflow-x-auto scrollbar-hide"
    >
      <div
        class="flex flex-wrap max-w-[150px] md:max-w-fit md:flex-nowrap gap-0.5 md:gap-2"
      >
        <InfoItem label="Mark" :value="markPrice.toFixed(2)" />
        <InfoItem label="Index" :value="indexPrice.toFixed(2)" />
        <InfoItem
          label="Funding (8h) / Countdown"
          :value="fundingRateDisplay"
        />
        <InfoItem label="24h High" :value="high24h" />
        <InfoItem label="24h Low" :value="low24h" />
        <InfoItem label="Volume (BTC)" :value="volumeBTC.toFixed(2)" />
        <InfoItem label="Volume (USDT)" :value="volumeUSDT.toFixed(2)" />
        <InfoItem label="Open Interest (USDT)" :value="openInterestUSDT" />
      </div>
    </div>

    <div
      v-if="showScrollRight"
      @click="scrollRight"
      class="hidden md:flex h-full items-center justify-center scroll-btn px-3 absolute top-1/2 right-0 -translate-y-1/2 z-10 rotate-[180deg]"
    >
      <svg
        class="text-white rotate-[180deg] opacity-[0.7]"
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="24"
        viewBox="0 0 12 24"
      >
        <path
          fill="currentColor"
          fill-rule="evenodd"
          d="M10.157 12.711L4.5 18.368l-1.414-1.414l4.95-4.95l-4.95-4.95L4.5 5.64l5.657 5.657a1 1 0 0 1 0 1.414"
        />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount, computed } from "vue";

import { useRoute } from "#imports";
import { useFuturesDetails } from "../../composable/useFuturesDetails";
import InfoItem from "../utils/InfoItem.vue";
import { useFuturesStore } from "../../stores/futures";

const store = useFuturesStore();
const route = useRoute();
const querySymbol = ref("BTCUSDT");

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
const scrollContainer = ref(null);
const isSmallScreen = ref(false);
const showScrollLeft = ref(false);
const showScrollRight = ref(false);

watch(perpPrice, (val) => {
  if (prevPrice.value !== null) {
    priceTrend.value =
      val > prevPrice.value ? "up" : val < prevPrice.value ? "down" : "neutral";
  }
  prevPrice.value = val;
  store.setRealTimePrice(perpPrice.value);
  store.setPrice(perpPrice.value);
});

const fundingRateDisplay = computed(() =>
  fundingRate.value != null && fundingCountdownFormatted.value != null
    ? `${fundingRate.value.toFixed(5)}% / ${fundingCountdownFormatted.value}`
    : "..."
);

const iconUrl = computed(() => {
  const map = { btc: 1, eth: 1027, bnb: 1839 };
  const s = symbol.value.replace("USDT", "").toLowerCase();
  const coinId = map[s];
  return coinId
    ? `https://s2.coinmarketcap.com/static/img/coins/64x64/${coinId}.png`
    : null;
});

const checkScreen = () => {
  isSmallScreen.value = window.innerWidth < 1416;
  updateScrollButtons();
};

const updateScrollButtons = () => {
  if (!scrollContainer.value) return;
  const el = scrollContainer.value;
  showScrollLeft.value = el.scrollLeft > 0;
  showScrollRight.value = el.scrollLeft + el.clientWidth < el.scrollWidth;
};

const scrollLeft = () => {
  scrollContainer.value.scrollBy({ left: -200, behavior: "smooth" });
};

const scrollRight = () => {
  scrollContainer.value.scrollBy({ left: 200, behavior: "smooth" });
};

onMounted(() => {
  if (route && route.query && route.query.symbol) {
    querySymbol.value = route.query.symbol;
  }
  checkScreen();
  window.addEventListener("resize", checkScreen);
  if (scrollContainer.value) {
    scrollContainer.value.addEventListener("scroll", updateScrollButtons);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkScreen);
  if (scrollContainer.value) {
    scrollContainer.value.removeEventListener("scroll", updateScrollButtons);
  }
});
</script>

<style scoped>
.box {
  font-size: 12px;
}

* {
  font-feature-settings: "tnum";
}

.scroll-btn {
  background: #181a20;
  background: linear-gradient(
    90deg,
    rgba(24, 26, 32, 1) 70%,
    rgba(255, 255, 255, 0) 100%
  );
}
</style>
