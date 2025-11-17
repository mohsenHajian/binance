<template>
  <div class="flex gap-4 p-4">
    <!-- ستون چپ: باکس‌های بزرگ -->
    <div class="left-column" ref="leftColumn">
      <div
        v-for="(box, index) in leftBoxes"
        :key="box.id"
        class="box"
        :style="{
          background: box.color,
          height: box.h + 'px',
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
          background: box.color,
          height: box.h + 'px',
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

const allBoxes = ref([
  { id: 1, color: "#FF6B6B", label: "Box 1", h: 180, width: "320px" },
  { id: 2, color: "#4ECDC4", label: "Box 2", h: 260, width: "320px" },
  { id: 3, color: "#FFD93D", label: "Box 3", h: 140, width: "320px" },
  { id: 4, color: "#1A535C", label: "Box 4", h: 220, width: "100%" },
  { id: 5, color: "#FF9F1C", label: "Box 5", h: 170, width: "100%" },
  { id: 6, color: "#6A4C93", label: "Box 6", h: 120, width: "100%" },
  { id: 7, color: "#30AADD", label: "Box 7", h: 300, width: "100%" },
  { id: 8, color: "#E63946", label: "Box 8", h: 150, width: "100%" },
  { id: 9, color: "#0081A7", label: "Box 9", h: 240, width: "100%" },
  { id: 10, color: "#B5179E", label: "Box 10", h: 200, width: "100%" },
]);

const rightBoxes = ref(allBoxes.value.slice(0, 3));
const leftBoxes = ref(allBoxes.value.slice(3));

const leftColumn = ref(null);
const rightColumn = ref(null);

const updateLeftBoxesWidth = () => {
  const rightWidth = 370;
  const gap = 12;
  const leftWidth = window.innerWidth - rightWidth - gap + "px";

  leftBoxes.value.forEach((box) => {
    if (parseInt(box.width) > 320 || box.width === "100%") {
      box.width = leftWidth;
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
.container {
  display: flex;
  gap: 12px;
  padding: 12px;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  overflow-y: auto;
}

.left-column,
.right-column {
  display: flex;
  flex-direction: column;
  gap: 12px;
  /* هیچ عرضی برای آیتم‌ها مشخص نمی‌کنیم */
}

/* باکس‌ها */
.box {
  border-radius: 10px;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: grab;
  user-select: none;
}

/* استایل هنگام drag */
.drag-ghost {
  opacity: 1 !important;
  transform: scale(1.05);
}
</style>
