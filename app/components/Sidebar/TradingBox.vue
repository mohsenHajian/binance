<template>
  <div class="box min-h-[45vh] flex flex-col px-4 py-3 !cursor-default">
    <div class="flex items-center justify-between w-full drag-handle">
      <div class="flex items-center gap-2 mb-2.5">
        <button
          class="flex items-center justify-center rounded-[4px] bg-[#2E343F] text-xs w-[70px] h-6 active:opacity-[0.8]"
        >
          Cross
        </button>

        <button
          class="flex items-center justify-center rounded-[4px] bg-[#2E343F] text-xs w-[70px] h-6 active:opacity-[0.8]"
        >
          20x
        </button>

        <button
          class="flex items-center justify-center rounded-[4px] bg-[#2E343F] text-xs w-fit h-6 px-3 active:opacity-[0.8]"
        >
          s
        </button>
      </div>

      <svg
        class="text-gray-500 hover:text-white cursor-pointer relative -top-1 w-4 h-fit"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.9 10a1.5 1.5 0 011.5 1.5v1A1.5 1.5 0 014.9 14h-1a1.5 1.5 0 01-1.5-1.5v-1A1.5 1.5 0 013.9 10h1zm7.6 0a1.5 1.5 0 011.5 1.5v1a1.5 1.5 0 01-1.5 1.5h-1a1.5 1.5 0 01-1.5-1.5v-1a1.5 1.5 0 011.5-1.5h1zm7.6 0a1.5 1.5 0 011.5 1.5v1a1.5 1.5 0 01-1.5 1.5h-1a1.5 1.5 0 01-1.5-1.5v-1a1.5 1.5 0 011.5-1.5h1z"
          fill="currentColor"
        ></path>
      </svg>
    </div>

    <div
      class="flex items-center w-full justify-between mt-3 text-sm border-b border-[#333B47] pb-1 drag-handle"
    >
      <div class="flex items-center gap-4 relative">
        <button
          v-for="(tab, index) in tabs"
          :key="index"
          @click="activeTab = index"
          class="text-sm relative py-1 font-normal"
          :class="
            activeTab === index
              ? 'text-yellow-400'
              : 'text-gray-400 hover:text-white'
          "
          ref="tabRefs"
        >
          {{ tab }}
        </button>

        <span
          class="absolute -bottom-1 h-[2px] bg-yellow-400 transition-all duration-300"
          :style="underlineStyle"
        ></span>
      </div>
      <svg
        class="opacity-[0.7] w-4 h-4 text-white cursor-default hover:opacity-[1]"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 1.6c5.744 0 10.4 4.656 10.4 10.4 0 5.744-4.656 10.4-10.4 10.4-5.744 0-10.4-4.656-10.4-10.4C1.6 6.256 6.256 1.6 12 1.6zm0 1.8A8.6 8.6 0 003.4 12a8.6 8.6 0 008.6 8.6 8.6 8.6 0 008.6-8.6A8.6 8.6 0 0012 3.4zm0 6.3a.9.9 0 01.9.9v6a.9.9 0 01-1.8 0v-6a.9.9 0 01.9-.9zm0-3.1a1 1 0 110 2 1 1 0 010-2z"
          fill="currentColor"
        ></path>
      </svg>
    </div>

    <div class="text-xs text-[#4F5867] my-2.5">
      Avbl<span class="text-[#EAECEF]"> - USDT</span>
    </div>

    <div class="text-xs text-[#707A8A] font-normal mb-1">Price</div>
    <div class="flex items-center gap-2 mb-1">
      <div v-if="isPriceFormat" class="relative w-full">
        <input
          type="text"
          :value="formattedPrice"
          @input="updatePrice($event.target.value)"
          class="bg-transparent border border-[#434C5A] h-10 px-3 text-sm w-full focus:outline-none focus:border-[#F0B90B] font-semibold hover:border-[#F0B90B] transition-all rounded-[8px]"
        />
        <span class="text-[#EAECEF] text-sm absolute right-3 top-2.5"
          >USDT</span
        >
      </div>
      <div v-else class="relative inline-block text-left w-full rounded-[8px]">
        <!-- Dropdown button -->
        <button
          @click="isPriceDropDownOpen = !isPriceDropDownOpen"
          class="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-white border border-[#434C5A] focus:outline-none focus:border-[#F0B90B] hover:border-[#F0B90B] transition-all"
        >
          {{ priceDropDownValue }}
          <svg
            class="-mr-1 h-5 w-5 text-gray-400 transition-all"
            :class="isPriceDropDownOpen && 'rotate-[180deg]'"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <!-- Dropdown menu -->
        <div
          v-show="isPriceDropDownOpen"
          @click.outside="isPriceDropDownOpen = false"
          class="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-white/10 z-[40] focus:outline-none transition transform scale-95 opacity-0"
          :class="{ 'scale-100 opacity-100': isPriceDropDownOpen }"
        >
          <div class="py-1">
            <a
              href="#"
              @click="priceDropDownValue = 'Counterparty 1'"
              :class="
                priceDropDownValue === 'Counterparty 1' ? 'bg-white/5' : ''
              "
              class="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
            >
              Counterparty 1
            </a>
            <a
              href="#"
              @click="priceDropDownValue = 'Counterparty 5'"
              :class="
                priceDropDownValue === 'Counterparty 5' ? 'bg-white/5' : ''
              "
              class="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
            >
              Counterparty 5
            </a>
            <a
              href="#"
              @click="priceDropDownValue = 'Queue 1'"
              :class="priceDropDownValue === 'Queue 1' ? 'bg-white/5' : ''"
              class="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
            >
              Queue 1
            </a>
            <a
              href="#"
              @click="priceDropDownValue = 'Queue 5'"
              :class="priceDropDownValue === 'Queue 5' ? 'bg-white/5' : ''"
              class="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
            >
              Queue 5
            </a>
          </div>
        </div>
      </div>

      <button
        @click="isPriceFormat = !isPriceFormat"
        class="bg-transparent text-xs w-[56px] h-10 border border-[#434C5A] rounded-[8px] focus:border-[#ffffff] transition-all"
      >
        BBO
      </button>
    </div>

    <div class="text-xs text-[#707A8A] font-normal mb-1">Size</div>
    <div class="flex items-center gap-2">
      <div class="relative w-full">
        <input
          type="text"
          :value="Math.round(position) + '%'"
          class="bg-transparent border border-[#434C5A] h-10 px-3 text-sm w-full focus:outline-none focus:border-[#F0B90B] hover:border-[#F0B90B] font-semibold transition-all rounded-[8px]"
        />
        <span class="text-[#EAECEF] text-sm absolute right-3 top-2.5">ETH</span>
      </div>
    </div>

    <div
      class="w-full px-4 mt-5 mb-2 slider-container select-none z-[30] cursor-default"
    >
      <div
        class="relative w-full h-0.5 bg-[#434C5A] rounded-full"
        ref="sliderElRef"
      >
        <!-- filled track -->
        <div
          class="absolute h-0.5 bg-white rounded-full"
          :style="{ width: position + '%' }"
        ></div>

        <!-- draggable thumb -->
        <div
          class="absolute top-1/2 -translate-y-1/2 z-[20] w-[9px] h-[9px] bg-[#181A20] border-1 border-white rotate-45 cursor-pointer"
          :style="{ left: `calc(${position}% - 8px)` }"
          @mousedown.stop="startDrag"
          @touchstart.stop.prevent="startDrag"
        ></div>

        <!-- checkpoints -->
        <div
          v-for="p in checkpoints"
          :key="p"
          class="absolute top-1/2 -translate-y-1/2 w-[7px] h-[7px] border rotate-45"
          :class="
            position >= p
              ? 'bg-white border-white'
              : 'bg-[#181a20] border-[#434C5A]'
          "
          :style="{ left: `calc(${p}% - 6px)` }"
        ></div>
      </div>
    </div>

    <div class="mt-4 flex w-full flex-col gap-2.5">
      <button
        class="w-full h-9 bg-[#FCD535] text-[#202630] text-sm rounded-[6px] cursor-pointer active:opacity-[0.7] transition-all"
      >
        Register Now
      </button>
      <button
        class="w-full h-9 bg-[#333B47] text-[#EAECEF] text-sm rounded-[6px] cursor-pointer active:opacity-[0.7] transition-all"
      >
        Log In
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from "vue";
import { useFuturesStore } from "~/stores/futures";

const tabs = ["Limit", "Market", "Stop Limit"];
const activeTab = ref(0);
const tabRefs = ref([]);
const isPriceFormat = ref(true);
const isPriceDropDownOpen = ref(false);
const priceDropDownValue = ref("Counterparty 1");

const futuresStore = useFuturesStore();

const price = ref(0);

const position = ref(0);
const isDragging = ref(false);
const checkpoints = [0, 25, 50, 75, 100];
const sliderElRef = ref(null);

const startDrag = () => {
  isDragging.value = true;
};
const stopDrag = () => {
  isDragging.value = false;
};

const onDrag = (e) => {
  if (!isDragging.value || !sliderElRef.value) return;

  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const rect = sliderElRef.value.getBoundingClientRect();
  let percent = ((clientX - rect.left) / rect.width) * 100;
  position.value = Math.max(0, Math.min(100, percent));
};

watch(
  () => futuresStore.getPrice(),
  (newVal) => {
    if (newVal) price.value = newVal;
  }
);

const formattedPrice = computed({
  get() {
    return price.value.toLocaleString();
  },
  set(value) {
    const number = Number(value.replace(/,/g, ""));
    if (!isNaN(number)) {
      price.value = number;
    } else {
      price.value = 0;
    }
  },
});

const underlineStyle = computed(() => {
  if (!tabRefs.value[activeTab.value]) return {};
  const el = tabRefs.value[activeTab.value];
  return {
    width: `${el.offsetWidth}px`,
    left: `${el.offsetLeft}px`,
  };
});

onMounted(() => {
  window.addEventListener("mousemove", onDrag);
  window.addEventListener("mouseup", stopDrag);
  window.addEventListener("touchmove", onDrag);
  window.addEventListener("touchend", stopDrag);
  nextTick(() => {});
});
onBeforeUnmount(() => {
  window.removeEventListener("mousemove", onDrag);
  window.removeEventListener("mouseup", stopDrag);
  window.removeEventListener("touchmove", onDrag);
  window.removeEventListener("touchend", stopDrag);
});
</script>

<style scoped>
[v-cloak] > * {
  display: none;
}
button {
  outline: none;
}
</style>
