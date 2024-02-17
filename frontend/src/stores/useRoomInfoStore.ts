import { create } from 'zustand';

interface RoomInfoState {
	roomName: string;
	participation: number;
	owner: string;
	kicked: boolean;
	chatMemberResponses: { username: string }[];
	setRoomInfo: (info: Partial<RoomInfoState>) => void;
	setOwner: (owner: string) => void;
	setKicked: (kicked: boolean) => void;
	setChatMemberResponses: (responses: { username: string }[]) => void;
}

export const useRoomInfoStore = create<RoomInfoState>((set) => ({
	roomName: '',
	participation: 0,
	owner: '',
	kicked: false,
	chatMemberResponses: [],
	setRoomInfo: (info) => set((state) => ({ ...state, ...info })),
	setOwner: (owner) => set({ owner }),
	setKicked: (kicked) => set({ kicked }),
	setChatMemberResponses: (responses) => set({ chatMemberResponses: responses }),
}));
