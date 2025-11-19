<template>
  <div class="flex flex-col w-full overflow-x-hidden">
    <TheHeader />

    <!-- Desktop layout -->
    <div v-if="innerWidth >= 768" class="flex gap-0.5 mb-10">
      <!-- Left Column -->
      <div class="left-column" ref="leftColumn">
        <BinanceTrack
          :symbol="symbol"
          @update:symbol="updateSymbol"
          :style="{ width: xlWidth + 'px' }"
        />
        <LandingDetails :style="{ width: xlWidth + 'px' }" />
        <TradingViewBox :style="{ width: lgWidth + 'px' }" />
        <OrderBook :style="{ width: (orderBookWidth || smWidth) + 'px' }" />
        <TradeHistory :style="{ width: xlWidth + 'px' }" />
      </div>

      <!-- Right Column -->
      <div class="right-column" ref="rightColumn">
        <TradingBox :style="{ width: smWidth + 'px' }" />
        <AccountBox :style="{ width: smWidth + 'px' }" />
      </div>
    </div>

    <!-- Mobile layout -->
    <div v-if="innerWidth < 768" class="flex flex-col md:hidden gap-1.5 mb-10">
      <LandingDetails />
      <SwitchContent />
      <TradeHistory />
    </div>
    <TheFooter />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import { useRouter, useRoute } from "#imports";
import Sortable from "sortablejs";

import { useBoxStatus } from "@/stores/boxStatus";
import TheHeader from "./components/base/TheHeader.vue";
import TheFooter from "./components/base/TheFooter.vue";
import BinanceTrack from "./components/Main/BinanceTrack.vue";
import LandingDetails from "./components/Main/LandingDetails.vue";
import TradingBox from "./components/Sidebar/TradingBox.vue";
import TradingViewBox from "./components/Main/TradingViewBox.vue";
import AccountBox from "./components/Sidebar/AccountBox.vue";
import TradeHistory from "./components/Main/TradeHistory.vue";
import OrderBook from "./components/Main/OrderBook.vue";
import SwitchContent from "./components/Main/SwitchContent.vue";

// Router & symbol
const route = useRoute();
const router = useRouter();
const boxStore = useBoxStatus();
const symbol = ref(route.query.symbol || "BTCUSDT");
const updateSymbol = (newSymbol) => {
  symbol.value = newSymbol;
  router.replace({ query: { ...route.query, symbol: newSymbol } });
};

const innerWidth = ref(0);

// Box widths
const smWidth = 320;
const xlWidth = ref(0);
const lgWidth = ref(0);
const orderBookWidth = ref(0);

// Refs for columns
const leftColumn = ref(null);
const rightColumn = ref(null);

// Boxes
const allBoxes = ref([
  { id: 1, label: "Box 1", h: "220px" },
  { id: 2, label: "Box 2", h: "220px" },
  { id: 3, label: "Box 3", h: "220px" },
  { id: 4, label: "Box 4", h: "50vh" },
  { id: 5, label: "Box 5", h: "220px" },
  { id: 6, label: "Box 6", h: "50px" },
  { id: 7, label: "Box 7", h: "50px" },
  { id: 8, label: "Box 8", h: "220px" },
  { id: 9, label: "Box 9", h: "220px" },
  { id: 10, label: "Box 10", h: "220px" },
]);

// Split boxes for left/right
const rightBoxes = ref(allBoxes.value.slice(0, 3));
const leftBoxes = ref(allBoxes.value.slice(3));

// Function to update widths on resize
const updateLeftBoxesWidth = () => {
  innerWidth.value = window.innerWidth;

  const gap = 6;
  const leftWidth = window.innerWidth - smWidth - gap;

  xlWidth.value = leftWidth;
  lgWidth.value = leftWidth - smWidth - gap;

  if (window.innerWidth <= 1024) {
    lgWidth.value = leftWidth;
    orderBookWidth.value = leftWidth;
  } else {
    lgWidth.value = leftWidth - smWidth - gap;
    orderBookWidth.value = 0;
  }
  if (!boxStore.getIsOrderBookVisible()) {
    lgWidth.value = xlWidth.value;
  }
};

watch(
  () => boxStore.getIsOrderBookVisible(),
  (newVal, oldVal) => {
    if (!newVal) {
      lgWidth.value = xlWidth.value;
    }
  }
);

onMounted(async () => {
  innerWidth.value = window.innerWidth;

  updateLeftBoxesWidth();
  window.addEventListener("resize", updateLeftBoxesWidth);

  // Wait for DOM to render because v-show keeps DOM, v-if doesn't
  await nextTick();

  const groupOptions = { name: "boxes", pull: true, put: true };

  // Init Sortable only when elements exist
  if (leftColumn.value) {
    Sortable.create(leftColumn.value, {
      group: groupOptions,
      animation: 150,
      handle: ".drag-handle",
      ghostClass: "drag-ghost",
      onStart(evt) {
        evt.item.style.visibility = "hidden";
      },
      onEnd(evt) {
        evt.item.style.visibility = "visible";
        const moved = leftBoxes.value.splice(evt.oldIndex, 1)[0];
        leftBoxes.value.splice(evt.newIndex, 0, moved);
      },
    });
  }

  if (rightColumn.value) {
    Sortable.create(rightColumn.value, {
      group: groupOptions,
      animation: 150,
      handle: ".drag-handle",
      ghostClass: "drag-ghost",
      onStart(evt) {
        evt.item.style.visibility = "hidden";
      },
      onEnd(evt) {
        evt.item.style.visibility = "visible";
        const moved = rightBoxes.value.splice(evt.oldIndex, 1)[0];
        rightBoxes.value.splice(evt.newIndex, 0, moved);
      },
    });
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateLeftBoxesWidth);
});
</script>

<style scoped>
.left-column {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  row-gap: 6px;
  align-content: flex-start;
}

.right-column {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.drag-ghost {
  opacity: 1 !important;
  transform: scale(1.05);
}
</style>
