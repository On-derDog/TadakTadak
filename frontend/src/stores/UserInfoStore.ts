import { Children } from "react";
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

const createUserInfoStore = (set) => ({
  email: '',
  password: '',
  username: '',
  updateEmail: (email: string) => set({ email }),
  updatePassword: (password: string) => set({ password }),
  updateUsername: (username: string) => set({ username }),
});

export const userInfoStore = create<UserInfo>()(
  import.meta.env.DEV
    ? devtools(
      createUserInfoStore ,
        { name: 'userInfo' }
      )
    : createUserInfoStore 
);

// const createUserInfoStoreDemo = create<UserInfo>()(  
//     (set) => ({
//       email: '',
//       password: '',
//       username: '',
//       updateEmail: (email) => set({ email }),
//       updatePassword: (password) => set({ password }),
//       updateUsername: (username) => set({ username }),
//     }),
// );
