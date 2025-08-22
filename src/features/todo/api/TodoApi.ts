import { http } from "@/shared/lib/axios";
import type { TodoCreate, TodoUpdate } from "../model/todo/request";
import type { TodoResponse } from "../model/todo/response";

export const todoApi = {
  // 조회
  async getTodos(): Promise<TodoResponse[]> {
    const { data } = await http.get("/todos");
    return data;
  },

  // 생성
  async createTodo(params: TodoCreate): Promise<TodoResponse> {
    const { data } = await http.post("/todos", params);
    return data;
  },

  // 수정
  async updateTodo(params: TodoUpdate): Promise<boolean> {
    const { id, title, done } = params;
    const { status } = await http.patch(
      `/todos/${id}?title=${title}&done=${done}`
    );
    return status === 200;
  },

  // 삭제
  async deleteTodo(id: number): Promise<boolean> {
    const { status } = await http.delete(`/todos/${id}`);
    return status === 200;
  },
};
