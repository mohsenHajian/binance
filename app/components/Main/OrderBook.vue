<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { useRoute } from "#imports";
import { useFuturesStore } from "@/stores/futures";
import { useBoxStatus } from "@/stores/boxStatus";

// --- Store & Route ---
const store = useFuturesStore();
const boxStore = useBoxStatus();
const route = useRoute();

// --- Symbol ---
const symbol = ref((route.query.symbol || "BTCUSDT").toString().toUpperCase());

// --- Order Book ---
const asks = ref([]);
const bids = ref([]);
const hover = ref(false);
const visible = ref(true);

// --- Price ---
const currentPrice = computed(() => store.geRealTimePrice());
const lastPrice = ref(null);
const priceDirection = ref(null);

// --- WebSocket ---
let ws = null;

// ---------- FETCH SNAPSHOT ----------
const fetchSnapshot = async () => {
  try {
    const res = await fetch(
      `https://api.binance.com/api/v3/depth?symbol=${symbol.value}&limit=20`
    );
    const data = await res.json();

    asks.value = data.asks.map((a) => ({
      price: parseFloat(a[0]),
      amount: parseFloat(a[1]),
    }));

    bids.value = data.bids.map((b) => ({
      price: parseFloat(b[0]),
      amount: parseFloat(b[1]),
    }));
  } catch (e) {
    console.error("Snapshot fetch failed:", e);
  }
};

// ---------- WATCH PRICE ----------
watch(
  () => store.geRealTimePrice(),
  (newVal, oldVal) => {
    if (!oldVal) return;

    priceDirection.value =
      newVal > oldVal ? "up" : newVal < oldVal ? "down" : null;

    lastPrice.value = oldVal;
  }
);

// ---------- CUMULATIVE ----------
const calcCumulative = (arr) => {
  let sum = 0;
  return arr.map((i) => {
    sum += i.amount;
    return { ...i, sum };
  });
};

const hideOrderBook = () => {
  visible.value = false;
  boxStore.setIsOrderBookVisible(false);
};

const sortedAsks = computed(() =>
  calcCumulative([...asks.value].sort((a, b) => a.price - b.price)).slice(0, 7)
);

const sortedBids = computed(() =>
  calcCumulative([...bids.value].sort((a, b) => b.price - a.price)).slice(0, 7)
);

const maxAskSum = computed(() =>
  sortedAsks.value.length ? Math.max(...sortedAsks.value.map((i) => i.sum)) : 1
);
const maxBidSum = computed(() =>
  sortedBids.value.length ? Math.max(...sortedBids.value.map((i) => i.sum)) : 1
);

// ---------- DETECT MOBILE ----------
const isMobile = computed(() => window.innerWidth < 768);

// ---------- ASK BACKGROUND ----------
const askBgStyle = (sum) => {
  const pct = (sum / maxAskSum.value) * 100;

  // Mobile: red filling left → right
  if (isMobile.value) {
    return {
      background: `linear-gradient(to right, rgba(246,70,93,0.18) ${pct}%, transparent 0%)`,
    };
  }

  // Desktop: right → left
  return {
    background: `linear-gradient(to left, rgba(246,70,93,0.18) ${pct}%, transparent 0%)`,
  };
};

// ---------- BID BACKGROUND ----------
const bidBgStyle = (sum) => {
  const pct = (sum / maxBidSum.value) * 100;

  // Mobile: green filling right → left
  if (isMobile.value) {
    return {
      background: `linear-gradient(to left, rgba(14,203,129,0.18) ${pct}%, transparent 0%)`,
    };
  }

  // Desktop: right → left
  return {
    background: `linear-gradient(to left, rgba(14,203,129,0.18) ${pct}%, transparent 0%)`,
  };
};

// ---------- CONNECT WS ----------
const connectWS = () => {
  if (!process.client) return;

  if (ws) ws.close();

  ws = new WebSocket(
    `wss://stream.binance.com/ws/${symbol.value.toLowerCase()}@depth20@100ms`
  );

  ws.onmessage = (event) => {
    const depth = JSON.parse(event.data);

    asks.value = depth.asks.map((a) => ({
      price: parseFloat(a[0]),
      amount: parseFloat(a[1]),
    }));

    bids.value = depth.bids.map((b) => ({
      price: parseFloat(b[0]),
      amount: parseFloat(b[1]),
    }));
  };

  ws.onclose = () => {
    setTimeout(connectWS, 1000);
  };
};

// ---------- WATCH SYMBOL CHANGE ----------
watch(
  () => route.query.symbol,
  async (newSym) => {
    if (!process.client || !newSym) return;

    symbol.value = newSym.toUpperCase();

    asks.value = [];
    bids.value = [];

    await fetchSnapshot();
    connectWS();
  }
);

// ---------- INIT ----------
onMounted(async () => {
  if (!process.client) return;

  await fetchSnapshot();
  connectWS();
});

onUnmounted(() => ws && ws.close());
</script>

<template>
  <div
    v-if="visible"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
    class="flex flex-col h-[45vh] text-[#EAECEF] text-xs box rounded drag-handle relative"
  >
    <svg
      v-if="hover"
      @click="hideOrderBook"
      class="hidden md:flex w-4 opacity-[0.5] cursor-pointer absolute top-0 right-0 z-10"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm3.637 6.363a.9.9 0 00-1.274 0L12 10.727 9.637 8.363l-.069-.061a.9.9 0 00-1.266 1.266l.061.069L10.727 12l-2.364 2.363a.9.9 0 001.274 1.274L12 13.273l2.363 2.364.069.061a.9.9 0 001.266-1.266l-.061-.069L13.273 12l2.364-2.363a.9.9 0 000-1.274z"
        fill="currentColor"
      ></path>
    </svg>
    <div
      class="hidden md:flex justify-between px-4 min-h-[40px] border-b border-[#333B47] items-center font-bold"
    >
      <span>Order Book</span>
    </div>

    <div class="hidden md:grid grid-cols-3 px-3 py-3 text-[11px] opacity-60">
      <span>Price (USDT)</span>
      <span>Size (BTC)</span>
      <span>Sum (BTC)</span>
    </div>

    <div class="flex flex-row-reverse md:flex-col overflow-y-auto grow">
      <!-- ASKS -->
      <div class="flex flex-col-reverse max-md:w-1/2 max-md:mt-2 max-md:h-fit">
        <div
          v-for="(row, i) in sortedAsks"
          :key="'ask-' + i"
          class="flex md:grid justify-between md:grid-cols-3 px-3 py-[2px] my-[1px] rounded relative font-normal"
          :style="askBgStyle(row.sum)"
        >
          <span class="text-[#F6465D]">{{ row.price.toFixed(1) }}</span>
          <span>{{ row.amount.toFixed(3) }}</span>
          <span class="hidden md:inline-block">{{ row.sum.toFixed(3) }}</span>
        </div>
        <div
          class="flex md:hidden my-1 items-center justify-between text-xs text-[#707A8A] px-3"
        >
          <span>Size</span>
          <span>Price</span>
        </div>
      </div>

      <!-- MID PRICE -->
      <div
        class="text-left py-2 font-semibold text-lg hidden md:flex items-center justify-start ml-3 gap-2 transition-all"
        :class="{
          'text-[#0ECB81]': priceDirection === 'up',
          'text-[#F6465D]': priceDirection === 'down',
        }"
      >
        <span>{{ currentPrice?.toFixed(1) }}</span>

        <span v-if="priceDirection === 'up'" class="text-[#0ECB81] text-base"
          >▲</span
        >
        <span v-if="priceDirection === 'down'" class="text-[#F6465D] text-base"
          >▼</span
        >

        <span v-if="lastPrice" class="opacity-50 text-xs text-gray-400">
          {{ lastPrice.toFixed(1) }}
        </span>
      </div>

      <!-- BIDS -->
      <div
        class="flex flex-col-reverse md:flex-col max-md:w-1/2 max-md:mt-2 max-md:h-fit"
      >
        <div
          v-for="(row, i) in sortedBids"
          :key="'bid-' + i"
          class="flex md:grid justify-between md:grid-cols-3 px-3 py-[2px] my-[1px] rounded relative font-normal"
          :style="bidBgStyle(row.sum)"
        >
          <span class="text-[#0ECB81]">{{ row.price.toFixed(1) }}</span>
          <span>{{ row.amount.toFixed(3) }}</span>
          <span class="hidden md:inline-block">{{ row.sum.toFixed(3) }}</span>
        </div>
        <div
          class="flex md:hidden my-1 items-center justify-between text-xs text-[#707A8A] px-3"
        >
          <span>Size</span>
          <span>Price</span>
        </div>
      </div>
    </div>
  </div>
</template>
