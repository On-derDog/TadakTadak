import { create } from 'zustand';

interface ChatStore {
	id: string; //아이디 값 받으면 추후 수정해야함.
	messages: string[];
	inputMessage: string;
	setId: (id: string) => void;  //아이디 값 받으면 추후 수정해야함.
	setMessages: (messages: (prev: string[]) => string[]) => void;
	setInputMessage: (inputMessage: string) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
	id: '', //아이디 값 받으면 추후 수정해야함.
	messages: [],
	inputMessage: '',
	setId: (id) => set({ id }), //아이디 값 받으면 추후 수정해야함.
	setMessages: (messages) =>
		set((state) => ({ messages: messages(state.messages) })),
	setInputMessage: (inputMessage) => set({ inputMessage }),
}));
