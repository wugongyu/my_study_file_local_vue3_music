<template>
  <div class="flex item-center cursor-pointer hover-text">
    <ElAvatar class="bg-gray-200" size="small" round :src="profile.avatarUrl ?? ''"></ElAvatar>
    <span class="text-xs ml-1.5" v-if="isLogin">{{ profile.nickname }}</span>
    <span class="text-xs ml-1.5" v-else @click="showLogin = true">login</span>
  </div>
  <el-dialog v-model="showLogin" title="Login" width="330px" append-to-body>
    <el-input size="large" placeholder="phone number" :prefix-icon="Phone" v-model="phone"></el-input>
    <el-input class="mt-5" size="large" placeholder="login password" :prefix-icon="Lock" v-model="password"></el-input>
    <button class="button w-full mt-5 py-5" style="border-radius: 5px;" @click="loginSubmit">Login</button>
  </el-dialog>
</template>

<script setup lang="ts">
import { Phone, Lock } from '@icon-park/vue-next';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
const phone = ref('');
const password = ref('');
const { login, checkLogin } = useUserStore();
const { profile, isLogin, showLogin } = storeToRefs(useUserStore());

function loginSubmit(){
  login(phone.value, password.value);
}

onMounted(() => {
  checkLogin();
});
</script>

<style></style>