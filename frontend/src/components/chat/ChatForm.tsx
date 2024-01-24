import useChatStore from '../../stores/useChatStore';
import Chat from './Chat';
import ChatRecent from './ChatRecent';

const ChatForm: React.FC = () => {
	const { inputMessage, setInputMessage, handleSendMessage } = useChatStore();

	return (
		<>
			<ChatRecent />
			<Chat />
			<div>
				<input
					type="text"
					value={inputMessage}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setInputMessage(e.target.value)
					}
					onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
						if (e.key === 'Enter') {
							handleSendMessage();
						}
					}}
					placeholder="채팅을 입력해주세요"
				/>
			</div>
		</>
	);
};

export default ChatForm;
