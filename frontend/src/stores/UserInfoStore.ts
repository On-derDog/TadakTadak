import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface UserInfo {
  email: string;
  password: string;
  username: string;
  updateEmail: (email: UserInfo['email']) => void;
  updatePassword: (password: UserInfo['password']) => void;
  updateUsername: (username: UserInfo['username']) => void;
}

export const UserInfoStore = create<UserInfo>()(
    devtools(
      (set, get) => ({
        email: '',
        password: '',
        username: '',
        updateEmail: (email) => set({ email }),
        updatePassword: (password) => set({ password }),
        updateUsername: (username) => set({ username }),
      }),
      {
          name: 'userInfo'
      }
    )
);

if (import.meta.env.PROD) {
  devtools(UserInfoStore); 
}