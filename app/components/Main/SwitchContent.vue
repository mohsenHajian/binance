<template>
  <div class="flex box flex-col">
    <div
      class="flex items-center gap-4 h-10 px-4 border-b border-[#333B47] relative"
    >
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        @click="activeTab = index"
        class="text-sm relative py-1 font-normal transition-all whitespace-nowrap"
        :class="
          activeTab === index ? 'text-white' : 'text-gray-400 hover:text-white'
        "
        ref="tabRefs"
      >
        {{ tab }}
      </button>
      <span
        class="absolute bottom-0 h-[2px] bg-yellow-400 transition-all duration-300"
        :style="underlineStyle"
      ></span>
    </div>
    <TradingViewBox v-if="activeTab == 0" />
    <OrderBook v-if="activeTab == 1" class="h-fit pb-5" />
  </div>
</template>
<script setup>
import TradingViewBox from "./TradingViewBox.vue";
import OrderBook from "./OrderBook.vue";

const tabs = ["Chart", "Order Book", "Trades"];
const activeTab = ref(0);
const tabRefs = ref([]);
const underlineStyle = computed(() => {
  if (!tabRefs.value[activeTab.value]) return {};
  const el = tabRefs.value[activeTab.value];
  return {
    width: `${el.offsetWidth}px`,
    left: `${el.offsetLeft}px`,
  };
});
</script>
