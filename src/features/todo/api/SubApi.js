import { http } from "@/shared/lib/axios";

export const subApi = {
  //특정 Todo의 SubTask 목록 조회
  async getByTodoId(todoId) {
    const { data } = await http.get(`/subtasks/todo/${todoId}`);
    return data;
  },

  //생성 + json으로 바로 반환
  async createSubTask(params) {
    const { data, status } = await http.post("/subtasks", params);
    if (status !== 201 && status !== 200) {
      throw console.error(`애러 발생 >>',${status})`);
    }
    return data;
  },

  //수정
  async updateSubTask(params) {
    const { id, content, done } = params;
    const query = {};
    if (typeof content !== "undefined") query.content = content;
    if (typeof done !== "undefined") query.done = done;

    const { status } = await http.patch(`/subtasks/${id}`, null, {
      params: query,
    });
    return status === 200;
  },

  //삭제
  async removeSubTask(id) {
    const { status } = await http.delete(`/subtasks/${id}`);
    return status === 200;
  },
};
