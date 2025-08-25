<template>
  <v-form @submit.prevent="onAdd">
    <div class="d-flex align-center ga-2">
      <v-text-field
        v-model="text"
        label="할 일 입력"
        hide-details="auto"
        density="default"
        class="flex-grow-1"
        @keydown.enter.prevent="onAdd"
      />
      <v-btn
        color="primary"
        height="56"
        :disabled="!text.trim()"
        @click="onAdd"
      >
        추가
      </v-btn>
    </div>
  </v-form>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["addTodo"]);
const text = ref("");

function onAdd() {
  if (!text.value.trim()) return;
  emit("add", text.value.trim());
  text.value = "";
}
</script>
