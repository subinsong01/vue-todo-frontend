<template>
  <div>
    <div class="d-flex align-center ga-2 mb-2 mr-3">
      <v-text-field
        v-model="todo._subtaskText"
        label="세부사항 추가"
        hide-details
        density="compact"
        class="flex-grow-1"
        @keydown.enter.prevent="emit('add', todo)"
      />
      <v-btn size="small" height="40" @click="emit('add', todo)"> 추가 </v-btn>
    </div>

    <v-list density="compact" class="bg-transparent">
      <v-list-item v-for="s in todo.subtasks" :key="s.id" class="rounded">
        <template #prepend>
          <v-checkbox
            :model-value="s.done"
            @update:model-value="
              (val) => {
                s.done = val;
                emit('toggle-subtask-done', todo, s);
              }
            "
            hide-details
          />
        </template>

        <!-- 보기 -->
        <v-list-item-title
          v-if="!s.editing"
          :class="s.done ? 'text-decoration-line-through' : ''"
          @dblclick="emit('start-edit', s)"
        >
          {{ s.content }}
        </v-list-item-title>

        <!-- 편집 -->
        <v-text-field
          v-else
          v-model="s._editText"
          density="compact"
          hide-details
          autofocus
          @keydown.enter.prevent="emit('save', todo, s)"
          @blur="emit('save', todo, s)"
        />

        <template #append>
          <template v-if="!s.editing">
            <v-btn size="x-small" variant="text" @click="emit('start-edit', s)">
              수정
            </v-btn>
            <v-btn
              size="x-small"
              variant="text"
              color="error"
              @click="() => emit('remove', s.id, todo)"
            >
              삭제
            </v-btn>
          </template>
          <template v-else>
            <v-btn size="x-small" variant="text" @click="emit('save', todo, s)">
              저장
            </v-btn>
            <v-btn
              size="x-small"
              variant="text"
              color="error"
              @click="emit('cancel-edit', s)"
            >
              취소
            </v-btn>
          </template>
        </template>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup>
const props = defineProps({
  todo: { type: Object, required: true },
});
const emit = defineEmits([
  "add",
  "toggle-subtask-done",
  "start-edit",
  "cancel-edit",
  "save",
  "remove",
]);
const { todo } = props;
</script>
