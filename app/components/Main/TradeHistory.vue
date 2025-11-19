<template>
  <div class="flex flex-col box drag-handle h-[38vh]">
    <div
      class="flex items-center gap-4 relative w-full gap-4 px-4 h-10 border-b border-[#333B47]"
    >
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        @click="activeTab = index"
        class="text-sm relative py-1 font-normal transition-all"
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
    <div class="flex grow flex items-center justify-center">
      <p class="text-xs font-semibold">
        <span class="text-[#f0b90b] cursor-pointer">Login</span> or
        <span class="text-[#f0b90b] cursor-pointer">Register Now</span> to trade
      </p>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const tabs = [
  "Positions",
  "Open Orders",
  "Order History",
  "Trade History",
  "Transaction History",
  "Position History",
  "Bots",
  "Assets",
];
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
