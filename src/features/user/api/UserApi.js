import { http } from "@/shared/lib/axios";

export async function postUser(param) {
  const { data } = await http.post("/users/login", param);
  return data;
}
