import { subApi } from "../../../features/todo/api/SubApi";

export const SubTaskService = {
  async getByTodoId(todoId) {
    const data = await subApi.getByTodoId(todoId);
    return data.map((s) => ({
      id: String(s.id),
      content: s.content,
      done: s.done,
      editing: false,
      _editText: "",
    }));
  },

  async create(todoId, content) {
    const newSubtask = {
      todoId: Number(todoId),
      content,
      done: false,
    };
    const created = await subApi.createSubTask(newSubtask);
    return {
      id: String(created.id),
      content: created.content,
      done: created.done,
      editing: false,
      _editText: "",
    };
  },

  async update(param) {
    await subApi.updateSubTask(param);
  },

  async remove(id) {
    await subApi.removeSubTask(Number(id));
  },
};
