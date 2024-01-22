import useChatStore from '../../stores/useChatStore';

const ChatForm: React.FC = () => {
	const { messages, inputMessage, setInputMessage, handleSendMessage } =
		useChatStore();

	return (
		<>
			<section>
				{messages.map((message) => (
					<div key={message.id}>
						<strong>{message.writer}: </strong> {message.message}
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
