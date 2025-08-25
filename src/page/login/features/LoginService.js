import { postUser } from "../../../features/user/api/UserApi";

export const LoginService = {
  async login(param) {
    const res = await postUser(param);
    return res;
  },
};
