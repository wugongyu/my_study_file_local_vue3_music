import type { UserProfile } from "@/models/user";
import { useLogin, useLoginStatus } from "@/services/api";
import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token:'',
      cookie: '',
      showLogin: false,
      profile: {} as UserProfile,
    };
  },
  getters: {
    isLogin: (state) => state.profile?.userId > 0,
  },
  actions: {
    async login(phone: string, password: string) {
      const res = await useLogin({ phone, password });
      if(res.code === 200) {
        this.token = res.token;
        this.cookie = res.cookie;
        document.cookie = res.cookie;
        localStorage.setItem('USER_TOKEN', this.token);
        localStorage.setItem('USER_COOKIE', this.cookie);
        this.checkLogin();
      }
    },
    async checkLogin() {
      const res = await useLoginStatus();
      const { data } = res || {};
      if(data && data.code === 200) {
        this.profile = data.profile;
        this.showLogin = false;
      }
    }
  },
})