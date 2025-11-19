<template>
  <div class="flex flex-col max-md:min-w-[46%] font-normal gap-0.5 md:gap-2">
    <span
      class="text-[#707A8A] hover:text-white transition-all text-[8px] md:text-xs whitespace-nowrap"
    >
      {{ label }}
    </span>
    <span
      class="font-mono inline-block min-w-[60px] text-[10px] md:text-xs text-left whitespace-nowrap"
      :class="valueClass"
    >
      {{ formattedValue }}
    </span>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  label: String,
  valueClass: String,
  value: {
    type: [Number, String, null],
    default: null,
  },
});

const formattedValue = computed(() => props.value?.toLocaleString?.() ?? "...");
</script>
