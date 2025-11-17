<template>
  <div class="flex gap-0.5">
    <div class="left-column" ref="leftColumn">
      <div
        v-for="(box, index) in leftBoxes"
        :key="box.id"
        class="box"
        :style="{
          height: box.h,
          width: box.width,
        }"
      >
        {{ box.label }}
      </div>
    </div>

    <!-- ستون راست: باکس‌های کوچک -->
    <div class="right-column" ref="rightColumn">
      <div
        v-for="(box, index) in rightBoxes"
        :key="box.id"
        class="box"
        :style="{
          height: '48vh',
          width: box.width,
        }"
      >
        {{ box.label }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import Sortable from "sortablejs";

const smallBoxWidth = 320

const allBoxes = ref([
  { id: 1, label: "Box 1", h: "220px", width: "320px" },
  { id: 2, label: "Box 2", h: "220px", width: "320px" },
  { id: 3, label: "Box 3", h: "220px", width: "320px" },
  { id: 4, label: "Box 4", h: "50vh", width: "50%" },
  { id: 5, label: "Box 5", h: "220px", width: "320px" },
  { id: 6, label: "Box 6", h: "220px", width: "100%" },
  { id: 7, label: "Box 7", h: "220px", width: "100%" },
  { id: 8, label: "Box 8", h: "220px", width: "100%" },
  { id: 9, label: "Box 9", h: "220px", width: "100%" },
  { id: 10, label: "Box 10", h: "220px", width: "100%" },
]);

const rightBoxes = ref(allBoxes.value.slice(0, 3));
const leftBoxes = ref(allBoxes.value.slice(3));

const leftColumn = ref(null);
const rightColumn = ref(null);

const updateLeftBoxesWidth = () => {
  const rightWidth = smallBoxWidth;
  const gap = 21;
  const leftWidth = window.innerWidth - rightWidth - gap;

  leftBoxes.value.forEach((box) => {
    if (box.width === "100%") {
      box.width = leftWidth + "px";
    } else if (box.width === "50%") {
      box.width = leftWidth - smallBoxWidth - 6 + "px";
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
.left-column,
.right-column {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.right-column {
  flex-direction: column;
}

.box {
  border-radius: 10px;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: grab;
  user-select: none;
  background-color: #181a20;
}

.drag-ghost {
  opacity: 1 !important;
  transform: scale(1.05);
}
</style>
