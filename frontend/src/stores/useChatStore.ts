import { create } from 'zustand';

interface ChatMessage {
	id: number;
	message: string;
	writer: string;
}

interface ChatStore {
	messages: ChatMessage[];
	inputMessage: string;
	addMessage: (message: string, writer: string) => void;
	setInputMessage: (value: string) => void;
	handleSendMessage: () => void;
}

const useChatStore = create<ChatStore>((set) => ({
	messages: [],
	inputMessage: '',
	addMessage: (message: string, writer: string): void => {
		set((state) => ({
			...state,
			messages: [
				...state.messages,
				{ id: state.messages.length + 1, message, writer },
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
