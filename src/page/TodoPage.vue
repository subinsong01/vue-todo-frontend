<template>
  <v-sheet class="mx-auto" width="640">
    <h1 class="text-h6 mb-4">Todo App</h1>

    <!-- 입력 폼 -->
    <v-form @submit.prevent="add">
      <div class="d-flex align-center ga-2">
        <v-text-field
          v-model="title"
          label="할 일 입력"
          hide-details="auto"
          density="default"
          class="flex-grow-1"
          @keydown.enter.prevent="add"
        />
        <v-btn
          color="primary"
          height="56"
          @click="add"
          :disabled="!title.trim()"
        >
          추가
        </v-btn>
      </div>
    </v-form>

    <!-- Todo 리스트 -->
    <v-list class="mt-7" density="comfortable">
      <template v-for="t in todos" :key="t.id">
        <v-list-item class="rounded-lg mb-2 ga-2" variant="tonal">
          <!-- 체크박스 -->
          <template #prepend>
            <v-checkbox
              :model-value="t.done"
              @update:model-value="() => toggleDone(t)"
              hide-details
            />
          </template>

          <!-- 제목: 보기 모드 -->
          <v-list-item-title
            v-if="!t.editing"
            :class="t.done ? 'text-decoration-line-through' : ''"
            @dblclick="t.editing = true"
          >
            {{ t.title }}
          </v-list-item-title>

          <!-- 제목: 수정 모드 -->
          <v-text-field
            v-else
            v-model="t.title"
            @keydown.enter="updateTitle(t)"
            @blur="updateTitle(t)"
            density="compact"
            hide-details
            autofocus
          />

          <!-- 버튼 영역 -->
          <template #append>
            <v-btn size="small" variant="text" @click="t.open = !t.open">
              {{ t.open ? "접기" : "자세히" }}
            </v-btn>
            <v-btn
              size="small"
              color="error"
              variant="text"
              @click="remove(Number(t.id))"
            >
              삭제
            </v-btn>
          </template>
        </v-list-item>

        <!-- 서브태스크 영역 -->
        <v-expand-transition>
          <div v-if="t.open" class="mt-3">
            <!-- 서브태스크 입력 -->
            <div class="d-flex align-center ga-2 mb-2 mr-3">
              <v-text-field
                v-model="t._subtaskText"
                label="세부사항 추가"
                hide-details
                density="compact"
                class="flex-grow-1"
                @keydown.enter.prevent="addSubtask(t.id)"
              />
              <v-btn size="small" height="40" @click="addSubtask(t.id)">
                추가
              </v-btn>
            </div>

            <!-- 서브태스크 리스트 -->
            <v-list density="compact" class="bg-transparent">
              <v-list-item v-for="s in t.subtasks" :key="s.id" class="rounded">
                <template #prepend>
                  <v-checkbox v-model="s.done" hide-details />
                </template>
                <v-list-item-title
                  :class="s.done ? 'text-decoration-line-through' : ''"
                >
                  {{ s.text }}
                </v-list-item-title>
                <template #append>
                  <v-btn
                    size="x-small"
                    variant="text"
                    color="error"
                    @click="removeSubtask(t.id, s.id)"
                  >
                    삭제
                  </v-btn>
                </template>
              </v-list-item>
            </v-list>
          </div>
        </v-expand-transition>
      </template>
    </v-list>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { todoApi } from "@/features/todo/api/TodoApi";
import type { TodoCreate } from "@/features/todo/model/todo/request";

// 타입 정의
type Subtask = { id: string; text: string; done: boolean };
type Todo = {
  id: string;
  title: string;
  done: boolean;
  subtasks: Subtask[];
  open?: boolean;
  _subtaskText?: string;
  editing?: boolean;
};

const title = ref<string>("");
const todos = ref<Todo[]>([]);

// ✅ 처음 로딩 시 Todo 불러오기
onMounted(async () => {
  const data = await todoApi.getTodos({});
  todos.value = data.map((d) => ({
    id: String(d.id),
    title: d.title,
    done: d.done,
    subtasks: [],
    open: false,
    _subtaskText: "",
    editing: false,
  }));
});

// ✅ Todo 추가
async function add() {
  const t = title.value.trim();
  if (!t) return;

  const newTodo: TodoCreate = { title: t, done: false };
  const created = await todoApi.createTodo(newTodo);

  todos.value.push({
    id: String(created.id),
    title: created.title,
    done: created.done ?? false,
    subtasks: [],
    open: false,
    _subtaskText: "",
    editing: false,
  });

  title.value = "";
}

// ✅ 제목 수정
async function updateTitle(todo: Todo) {
  if (!todo.title.trim()) return;

  await todoApi.updateTodo({
    id: Number(todo.id),
    title: todo.title,
    done: todo.done,
  });
  todo.editing = false;
}

// ✅ 삭제
async function remove(id: number) {
  await todoApi.deleteTodo(id);
  todos.value = todos.value.filter((x) => Number(x.id) !== id);
}

// ✅ 완료 상태 토글
async function toggleDone(todo: Todo) {
  await todoApi.updateTodo({ id: Number(todo.id), done: !todo.done });
  todo.done = !todo.done;
}

// ✅ 서브태스크 추가
function addSubtask(todoId: string) {
  const t = todos.value.find((x) => x.id === todoId);
  if (!t) return;
  const text = (t._subtaskText ?? "").trim();
  if (!text) return;
  t.subtasks.push({ id: crypto.randomUUID(), text, done: false });
  t._subtaskText = "";
}

// ✅ 서브태스크 삭제
function removeSubtask(todoId: string, subId: string) {
  const t = todos.value.find((x) => x.id === todoId);
  if (!t) return;
  t.subtasks = t.subtasks.filter((s) => s.id !== subId);
}
</script>
