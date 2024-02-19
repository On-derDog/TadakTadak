import { create } from 'zustand';
import { UserList } from '../interface/UserListInterface';

type UserListStore = {
	userlist: UserList[];
	setUserList: (userlist: UserList[]) => void;
};

export const useUserListStore = create<UserListStore>((set) => ({
	userlist: [],
	setUserList: (userlist) => set({ userlist }),
}));
