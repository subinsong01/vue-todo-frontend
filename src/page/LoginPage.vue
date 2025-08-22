<template>
  <v-sheet class="mx-auto" width="500">
    <v-form fast-fail @submit.prevent>
      <v-text-field v-model="id" label="아이디"></v-text-field>
      <v-text-field
        v-model="password"
        type="password"
        label="비밀번호"
      ></v-text-field>
      <v-btn class="mt-4" type="submit" block @click="onSubmit">로그인</v-btn>
    </v-form>
  </v-sheet>
</template>
<script lang="ts" setup>
import { postUser } from "@/features/user/api/UserApi";
import type { UserRequest } from "@/features/user/model/Request";
import { ref } from "vue";
import { useRouter } from "vue-router";

const id = ref("");
const password = ref("");
const router = useRouter();

const onSubmit = async () => {
  if (!id.value || !password.value) {
    confirm("아이디와 비밀번호 모두 입력하세요!");
    return;
  }

  try {
    const param: UserRequest = {
      username: id.value,
      password: password.value,
    };

    const res = await postUser(param);
    console.log("로그인 성공", res);

    router.push("/Todo");
  } catch (e) {
    confirm("로그인 실패");
  }
};
</script>
