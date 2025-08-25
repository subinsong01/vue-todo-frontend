import { todoApi } from "../../../features/todo/api/TodoApi";

export const TodoService = {
  async getTodos() {
    const data = await todoApi.getTodos();
    return data.map((d) => ({
      id: String(d.id),
      title: d.title,
      done: d.done,
      subtasks: [],
      open: false,
      _subtaskText: "",
      editing: false,
    }));
  },

  async create(title) {
    const newTodo = { title, done: false };
    const created = await todoApi.createTodo(newTodo);
    return {
      id: String(created.id),
      title: created.title,
      done: created.done ?? false,
      subtasks: [],
      open: false,
      _subtaskText: "",
      editing: false,
    };
  },

  async update(todo) {
    const param = {
      id: Number(todo.id),
      ...(todo.title !== undefined && { title: todo.title }),
      ...(todo.done !== undefined && { done: todo.done }),
    };
    await todoApi.updateTodo(param);
  },

  async remove(id) {
    await todoApi.deleteTodo(Number(id));
  },
};
