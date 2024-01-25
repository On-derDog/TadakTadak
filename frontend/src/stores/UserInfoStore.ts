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

const myMiddlewares = (f: any, storeName: string) => devtools(persist(f, { name: storeName }));

const createUserInfoStoreDev = create<UserInfo>()(  
  devtools(
    (set) => ({
      email: '',
      password: '',
      username: '',
      updateEmail: (email) => set({ email }),
      updatePassword: (password) => set({ password }),
      updateUsername: (username) => set({ username }),
    })
  ,{name: 'userInfo'}
));

const createUserInfoStore = create<UserInfo>()(  
    (set, get) => ({
      email: '',
      password: '',
      username: '',
      updateEmail: (email) => set({ email }),
      updatePassword: (password) => set({ password }),
      updateUsername: (username) => set({ username }),
    }),
);

export const UserInfoStore = import.meta.env.PROD ? createUserInfoStore : createUserInfoStoreDev;
