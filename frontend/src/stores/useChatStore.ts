import { create } from 'zustand';

interface ChatMessage {
	id: number;
	message: string;
	writer: string;
	createdAt: Date;
}

interface ChatStore {
	messages: ChatMessage[];
	inputMessage: string;
	addMessage: (message: string, writer: string, createdAt: Date) => void;
	setInputMessage: (value: string) => void;
	handleSendMessage: () => void;
}

const useChatStore = create<ChatStore>((set) => ({
	messages: [],
	inputMessage: '',
	addMessage: (message: string, writer: string, createdAt: Date): void => {
		set((state) => ({
			...state,
			messages: [
				...state.messages,
				{ id: state.messages.length + 1, message, writer, createdAt },
			],
		}));
	},
	setInputMessage: (value: string): void => set({ inputMessage: value }),
	handleSendMessage: () => {
		set((state) => {
			if (state.inputMessage.trim() !== '') {
				return {
					...state,
					messages: [
						...state.messages,
						{
							id: state.messages.length + 1,
							message: state.inputMessage,
							writer: 'User',
							createdAt: new Date(),
						},
					],
					inputMessage: '',
				};
			}
			return state;
		});
	},
}));

export default useChatStore;
