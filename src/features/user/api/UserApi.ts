import { http } from "@/shared/lib/axios";
import type { UserRequest } from "../model/Request";
import type { UserResponse } from "../model/Response";

export async function postUser(param: UserRequest): Promise<UserResponse> {
  const { data } = await http.post<UserResponse>("/users/login", param);
  console.log("param", param);
  return data;
}
