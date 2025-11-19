<template>
  <div class="flex flex-col w-full">
    <TheHeader />

    <div class="flex gap-0.5">
      <div class="left-column" ref="leftColumn">
        <BinanceTrack
          :symbol="symbol"
          @update:symbol="updateSymbol"
          :style="{ width: xlWidth + 'px' }"
        />
        <LandingDetails :style="{ width: xlWidth + 'px' }" />
        <TradingViewBox :style="{ width: lgWidth + 'px' }" />

        <div
          class="flex items-center justify-center box h-[220px] drag-handle"
          :style="{ width: smWidth + 'px' }"
        >
          hi
        </div>
      </div>

      <div class="right-column" ref="rightColumn">
        <TradingBox :style="{ width: smWidth + 'px' }" />
        <div
          v-for="(box, index) in rightBoxes"
          :key="box.id"
          class="box flex items-center justify-center"
          :style="{ height: '48vh', width: box.width }"
        >
          {{ box.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter, useRoute } from "#imports";
import Sortable from "sortablejs";

import TheHeader from "./components/base/TheHeader.vue";
import BinanceTrack from "./components/Main/BinanceTrack.vue";
import LandingDetails from "./components/Main/LandingDetails.vue";
import TradingBox from "./components/Sidebar/TradingBox.vue";
import TradingViewBox from "./components/Main/TradingViewBox.vue";

const route = useRoute();
const router = useRouter();

const symbol = ref(route.query.symbol || "BTCUSDT");

const updateSymbol = (newSymbol) => {
  symbol.value = newSymbol;
  router.replace({ query: { ...route.query, symbol: newSymbol } });
};

const smallBoxWidth = 320;
const allBoxes = ref([
  { id: 1, label: "Box 1", h: "220px", width: "320px" },
  { id: 2, label: "Box 2", h: "220px", width: "320px" },
  { id: 3, label: "Box 3", h: "220px", width: "320px" },
  { id: 4, label: "Box 4", h: "50vh", width: "80%" },
  { id: 5, label: "Box 5", h: "220px", width: "320px" },
  { id: 6, label: "Box 6", h: "50px", width: "100%" },
  { id: 7, label: "Box 7", h: "50px", width: "100%" },
  { id: 8, label: "Box 8", h: "220px", width: "100%" },
  { id: 9, label: "Box 9", h: "220px", width: "100%" },
  { id: 10, label: "Box 10", h: "220px", width: "100%" },
]);

const rightBoxes = ref(allBoxes.value.slice(0, 3));
const leftBoxes = ref(allBoxes.value.slice(3));

const leftColumn = ref(null);
const rightColumn = ref(null);

const xlWidth = ref(0);
const lgWidth = ref(0);
const smWidth = ref(320);

const updateLeftBoxesWidth = () => {
  const rightWidth = smallBoxWidth;
  const gap = 17;
  const leftWidth = window.innerWidth - rightWidth - gap;

  leftBoxes.value.forEach((box) => {
    if (box.width === "100%") {
      box.width = leftWidth + "px";
      xlWidth.value = leftWidth;
    } else if (box.width === "80%") {
      box.width = leftWidth - smallBoxWidth - 6 + "px";
      lgWidth.value = leftWidth - smallBoxWidth - 6;
    }
  });
};

onMounted(() => {
  updateLeftBoxesWidth();
  window.addEventListener("resize", updateLeftBoxesWidth);

  const groupOptions = { name: "boxes", pull: true, put: true };

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

.left-column .box:last-child {
  margin-bottom: 0;
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
