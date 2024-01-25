import { create, SetState } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface UserInfo {
  email: string;
  password: string;
  username: string;
  updateEmail: (email: UserInfo['email']) => void;
  updatePassword: (password: UserInfo['password']) => void;
  updateUsername: (username: UserInfo['username']) => void;
}

export const createUserInfoStoreDev = create<UserInfo>()(
  import.meta.env.DEV
    ? devtools(
        (set) => ({
          email: '',
          password: '',
          username: '',
          updateEmail: (email) => set({ email }),
          updatePassword: (password) => set({ password }),
          updateUsername: (username) => set({ username }),
        }),
        { name: 'userInfo' }
      )
    : (set) => ({
        email: '',
        password: '',
        username: '',
        updateEmail: (email) => set({ email }),
        updatePassword: (password) => set({ password }),
        updateUsername: (username) => set({ username }),
      })
);

const createUserInfoStore = create<UserInfo>()(  
    (set) => ({
      email: '',
      password: '',
      username: '',
      updateEmail: (email) => set({ email }),
      updatePassword: (password) => set({ password }),
      updateUsername: (username) => set({ username }),
    }),
);
