<template>
  <div class="flex flex-col box h-[38vh] relative">
    <div class="flex w-full border-b border-[#333B47] relative">
      <div
        v-if="showScrollLeft"
        @click="scrollLeft"
        class="flex lg:hidden h-full items-center justify-center scroll-btn px-3 absolute top-1/2 left-0 -translate-y-1/2 z-10"
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
      <div
        ref="scrollContainer"
        class="flex items-center gap-4 relative w-full gap-4 px-4 h-10 max-w-[726px] overflow-x-auto scrollbar-hide"
      >
        <button
          v-for="(tab, index) in tabs"
          :key="index"
          @click="activeTab = index"
          class="text-sm relative py-1 font-normal transition-all whitespace-nowrap"
          :class="
            activeTab === index
              ? 'text-white'
              : 'text-gray-400 hover:text-white'
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
      <div
        v-if="showScrollRight"
        @click="scrollRight"
        class="flex lg:hidden h-full items-center justify-center scroll-btn px-3 absolute top-1/2 right-0 -translate-y-1/2 z-10 rotate-[180deg]"
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

    <div class="flex grow flex items-center justify-center drag-handle">
      <p class="text-xs font-semibold">
        <span class="text-[#f0b90b] cursor-pointer">Login</span> or
        <span class="text-[#f0b90b] cursor-pointer">Register Now</span> to trade
      </p>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

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
const scrollContainer = ref(null);
const isSmallScreen = ref(false);
const showScrollLeft = ref(false);
const showScrollRight = ref(false);

const underlineStyle = computed(() => {
  if (!tabRefs.value[activeTab.value]) return {};
  const el = tabRefs.value[activeTab.value];
  return {
    width: `${el.offsetWidth}px`,
    left: `${el.offsetLeft}px`,
  };
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
.scroll-btn {
  background: #181a20;
  background: linear-gradient(
    90deg,
    rgba(24, 26, 32, 1) 70%,
    rgba(255, 255, 255, 0) 100%
  );
}
</style>
