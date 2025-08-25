<template>
  <v-sheet class="mx-auto" width="640">
    <h1 class="text-h6 mb-4">Todo App</h1>
    <todo-input @add="addTodo" />

    <!-- Todo 리스트 -->
    <v-list class="mt-7" density="comfortable">
      <template v-for="t in todos" :key="t.id">
        <todo-item
          :todo="t"
          @toggle-todo-done="toggleDone"
          @update-title="updateTitle"
          @remove-todo="removeTodo"
          @toggle-open="toggleTodoOpen"
        >
          <!-- 서브태스크 영역 -->
          <SubTaskList
            :todo="t"
            @add="addSubtask"
            @toggle-subtask-done="toggleSubtaskDone"
            @start-edit="startEditSubtask"
            @cancel-edit="cancelEditSubtask"
            @save="saveSubtask"
            @remove="handleRemoveSubtask"
          />
        </todo-item>
      </template>
    </v-list>
  </v-sheet>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { TodoService } from "./features/TodoService";
import { SubTaskService } from "./features/SubTaskService";
import TodoInput from "@/components/todo/TodoInput.vue";
import TodoItem from "@/components/todo/TodoItem.vue";
import SubTaskList from "@/components/todo/SubTaskList.vue";

const todos = ref([]);

onMounted(async () => {
  todos.value = await TodoService.getTodos();
});

async function toggleTodoOpen(todo) {
  todo.open = !todo.open;
  if (todo.open && todo.subtasks.length === 0) {
    todo.subtasks = await SubTaskService.getByTodoId(todo.id);
  }
}

async function addTodo(inputTitle) {
  if (!inputTitle) return;
  const newTodo = await TodoService.create(inputTitle);
  todos.value.push(newTodo);
}

async function updateTitle(todo) {
  if (!todo.title.trim()) return;
  await TodoService.update({ id: todo.id, title: todo.title, done: todo.done });
  todo.editing = false;
}

async function removeTodo(id) {
  await TodoService.remove(id);
  todos.value = todos.value.filter((t) => t.id !== id);
}

async function toggleDone(todo) {
  await TodoService.update({ id: todo.id, done: !todo.done });
  todo.done = !todo.done;
}

// SubTask 부분 ---------------------------------------------------------------

async function addSubtask(todo) {
  if (!todo._subtaskText?.trim()) return;
  const created = await SubTaskService.create(
    todo.id,
    todo._subtaskText.trim()
  );
  todo.subtasks.push(created);
  todo._subtaskText = "";
}

function startEditSubtask(s) {
  s._editText = s.content;
  s.editing = true;
}

function cancelEditSubtask(s) {
  s.editing = false;
  s._editText = "";
}

async function saveSubtask(todo, s) {
  const next = s._editText?.trim();
  if (!next || next === s.content) {
    s.editing = false;
    s._editText = "";
    return;
  }
  await SubTaskService.update({ id: Number(s.id), content: next });
  s.content = next;
  s.editing = false;
  s._editText = "";
}

async function toggleSubtaskDone(todo, s) {
  await SubTaskService.update({ id: Number(s.id), done: !s.done });
  s.done = !s.done;
}

async function handleRemoveSubtask(subId, todo) {
  await SubTaskService.remove(subId);
  todo.subtasks = todo.subtasks.filter((s) => s.id !== subId);
}
</script>
