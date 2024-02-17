import { create } from 'zustand';

interface RoomInfoState {
	roomName: string;
	participation: number;
	owner: string;
	isOwner: boolean;
	chatMemberResponses: { username: string }[];
	setRoomInfo: (info: Partial<RoomInfoState>) => void;
	setIsOwner: (isOwner: boolean, newOwner?: string) => void;
	setOwner: (owner: string) => void;
	setChatMemberResponses: (responses: { username: string }[]) => void;
}

export const useRoomInfoStore = create<RoomInfoState>((set) => ({
	roomName: '',
	participation: 0,
	owner: '',
	isOwner: false,
	chatMemberResponses: [],
	setRoomInfo: (info) => set((state) => ({ ...state, ...info })),
	setIsOwner: (isOwner, newOwner) =>
		set((state) => ({
			isOwner,
			owner: newOwner || state.owner,
		})),
	setOwner: (owner) => set({ owner }),
	setChatMemberResponses: (responses) => set({ chatMemberResponses: responses }),
}));
