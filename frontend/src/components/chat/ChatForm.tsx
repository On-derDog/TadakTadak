import useChatStore from '../../stores/useChatStore';
import RecentChat from './RecentChat';

const ChatForm: React.FC = () => {
	const { messages, inputMessage, setInputMessage, handleSendMessage } =
		useChatStore();

	const formatTime = (createdAt: Date) => {
		return createdAt.toLocaleTimeString('ko-KR', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: true,
		});
	};

	return (
		<>
			<RecentChat />
			<section>
				{messages.map((message) => (
					<div key={message.id}>
						<strong>{message.writer}: </strong> {message.message}{' '}
						{formatTime(message.createdAt)}
					</div>
				))}
			</section>
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
