import { create } from 'zustand';

interface Message {
	content: string;
	sender: string;
}

interface ChatStore {
	id: string;
	messages: Message[];
	inputMessage: string;
	setId: (id: string) => void;
	setMessages: (messages: (prev: Message[]) => Message[]) => void;
	setInputMessage: (inputMessage: string) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
	id: '',
	messages: [],
	inputMessage: '',
	setId: (id) => set({ id }),
	setMessages: (messages) => set((state) => ({ messages: messages(state.messages) })),
	setInputMessage: (inputMessage) => set({ inputMessage }),
}));
