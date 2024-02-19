import { UserList } from '../interface/UserListInterface';
import { create } from 'zustand';

type UserListStore = {
  userlist: UserList[];
  setUserList: (userlist: UserList[]) => void;
};

export const useUserListStore = create<UserListStore>((set) => ({
  userlist: [],
  setUserList: (userlist) => set({ userlist }),
}));
