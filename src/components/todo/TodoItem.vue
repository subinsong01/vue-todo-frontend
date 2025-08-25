<template>
  <v-list-item class="rounded-lg mb-2 ga-2" variant="tonal">
    <template #prepend>
      <v-checkbox
        :model-value="todo.done"
        @update:model-value="() => emit('toggle-todo-done', todo)"
        hide-details
      />
    </template>

    <!-- 제목 -->
    <v-list-item-title
      v-if="!todo.editing"
      :class="todo.done ? 'text-decoration-line-through' : ''"
      @dblclick="todo.editing = true"
    >
      {{ todo.title }}
    </v-list-item-title>

    <!-- 제목 수정 -->
    <v-text-field
      v-else
      v-model="todo.title"
      density="compact"
      hide-details
      @keydown.enter="() => emit('update-title', todo)"
    /><!--객체 전체를 보내줘야지 부모가 id, title을 함께 홣용가능하다 !-->
    <template #append>
      <v-btn
        size="small"
        variant="text"
        @click="() => emit('toggle-open', todo)"
      >
        {{ todo.open ? "접기" : "세부사항 추가" }}
      </v-btn>
      <v-btn
        size="small"
        color="error"
        variant="text"
        @click="() => emit('remove-todo', todo.id)"
      >
        삭제
      </v-btn>
    </template>
  </v-list-item>
  <!--효과-->
  <v-expand-transition>
    <div v-if="todo.open" class="mt-3">
      <!--todo가 open 경우에만 랜더링-->
      <slot />
      <!--부모가 자식 컴포넌트 안에 내용을 주입할 수 있는 자리-->
      <!-- 부모가 넣어준 <subtask-list>가 여기 렌더링됨 : todoPage에 적용 -->
    </div>
  </v-expand-transition>
</template>

<script setup>
const props = defineProps({
  todo: { type: Object, required: true },
});
const emit = defineEmits([
  "toggle-todo-done",
  "update-title",
  "remove-todo",
  "toggle-open",
]);
const { todo } = props;
</script>
