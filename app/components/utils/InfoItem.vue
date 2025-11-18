<template>
  <div class="flex flex-col font-normal gap-2">
    <span class="text-[#707A8A] hover:text-white transition-all text-xs">
      {{ label }}
    </span>
    <span
      class="font-mono inline-block min-w-[60px] text-left"
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
