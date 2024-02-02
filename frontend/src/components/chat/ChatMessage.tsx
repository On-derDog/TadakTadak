interface ChatMessage {
	sender: string;
	content: string;
}

type ChatMessageListProps = {
	messages: ChatMessage[];
};

const ChatMessageList = (props: ChatMessageListProps) => {
	const { messages } = props;

	return (
		<ul>
			{messages.map((msg, index) => (
				<li key={index}>
					<strong>{msg.sender} : </strong>
					{msg.content}
				</li>
			))}
		</ul>
	);
};

export default ChatMessageList;
