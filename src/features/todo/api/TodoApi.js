import { http } from "@/shared/lib/axios";
export const todoApi = {
  // 조회
  async getTodos() {
    const { data } = await http.get("/todos");
    return data;
  },

  // 생성
  async createTodo(params) {
    const { data } = await http.post("/todos", params);
    return data;
  },

  // 수정
  async updateTodo(params) {
    const { id, title, done } = params;

    const query = {}; //수정할 값이 있을 때만 요청에 포함시킴
    if (title !== undefined) query.title = title;
    if (done !== undefined) query.done = done;

    const { status } = await http.patch(`/todos/${id}`, {}, { params: query });
    return status === 200;
  },

  // 삭제
  async deleteTodo(id) {
    const { status } = await http.delete(`/todos/${id}`);
    return status === 200;
  },
};
