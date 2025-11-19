<template>
  <div
    class="relative inline-block"
    @mouseenter="isOpen = true"
    @mouseleave="isOpen = false"
  >
    <button
      class="flex flex-nowrap items-center gap-2 h-[64px] rounded px-3 duration-200"
      :style="{ color: isOpen ? '#F0B90B' : '#ffffff' }"
    >
      <span class="text-sm whitespace-nowrap">{{ title }}</span>

      <svg
        v-if="items"
        xmlns="http://www.w3.org/2000/svg"
        class="w-3 relative top-0.5 duration-200"
        :style="{ color: isOpen ? '#F0B90B' : '#EAECEF' }"
        :class="isOpen && 'rotate-[180deg]'"
        viewBox="0 0 1024 1024"
      >
        <path
          fill="currentColor"
          d="M831.872 340.864L512 652.672L192.128 340.864a30.59 30.59 0 0 0-42.752 0a29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728a30.59 30.59 0 0 0-42.752 0z"
        />
      </svg>
    </button>

    <div
      v-if="items"
      class="absolute flex items-start min-w-[220px] gap-3 left-0 mt-0 bg-[#202630] rounded-b-md shadow-lg duration-200 p-4 z-[50]"
      :class="isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'"
    >
      <div class="flex flex-col min-w-[220px]">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="relative group/item"
          @mouseenter="hoveredItem = item"
        >
          <div
            class="flex items-center justify-between px-4 h-12 rounded-[8px] hover:bg-[#29313D] cursor-pointer"
          >
            <a :href="item.link ?? '#'" class="text-[#EAECEF] text-sm">
              {{ item.label }}
            </a>

            <svg
              v-if="item.children"
              xmlns="http://www.w3.org/2000/svg"
              class="w-3 text-[#EAECEF] rotate-[-90deg]"
              viewBox="0 0 1024 1024"
            >
              <path
                fill="currentColor"
                d="M831.872 340.864L512 652.672L192.128 340.864a30.59 30.59 0 0 0-42.752 0a29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728a30.59 30.59 0 0 0-42.752 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div
        v-if="hoveredItem?.children"
        class="flex flex-col w-full rounded-[8px] bg-[#29313D] px-4 min-w-[220px] max-h-[380px] overflow-x-auto"
        @mouseenter="keepOpen = true"
        @mouseleave="hoveredItem = null"
      >
        <div
          v-for="(item, index) in hoveredItem.children"
          :key="index"
          class="flex items-center justify-between px-4 min-h-[48px] rounded-[8px] hover:bg-[#29313D] cursor-pointer"
        >
          <a :href="item.link ?? '#'" class="text-[#EAECEF] text-sm">
            {{ item.label }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  title: { type: String, default: "Menu" },
  items: { type: Array, required: true },
});

const hoveredItem = ref(null);
const isOpen = ref(false);
</script>
