import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface UserInfo {
  email: string;
  password: string;
  username: string;
  updateEmail: (email: UserInfo['email']) => void;
  updatePassword: (password: UserInfo['password']) => void;
  updateUsername: (username: UserInfo['username']) => void;
}

const createUserInfoStore = (set) => ({
  email: '',
  password: '',
  username: '',
  updateEmail: (email: string) => set({ email }),
  updatePassword: (password: string) => set({ password }),
  updateUsername: (username: string) => set({ username }),
});

let userInfoStoreTemp;

//devtools
if (import.meta.env.DEV) {
  userInfoStoreTemp = create<UserInfo>()(
    devtools(createUserInfoStore, { name: 'userInfo' })
  );
} else {
  userInfoStoreTemp = create<UserInfo>()(createUserInfoStore);
}

export const UserInfoStore = userInfoStoreTemp;
