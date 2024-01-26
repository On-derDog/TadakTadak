import useChatStore from '../../stores/useChatStore';
import { useEffect } from 'react';

const formatTime = (createdAt: Date) => {
	return createdAt.toLocaleTimeString('ko-KR', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: true,
	});
};

const formatDate = (createdAt: Date) => {
	return createdAt.toLocaleDateString('ko-KR', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
};

const Chat: React.FC = () => {
	const { messages } = useChatStore();

	useEffect(() => {
		console.log(messages);
	}, [messages]);

	return (
		<>
			<section>
				{messages.map((message, index, array) => {
					const isLastMessageForWriter =
						index === array.length - 1 ||
						array[index + 1].writer !== message.writer ||
						formatTime(array[index + 1].createdAt) !==
							formatTime(message.createdAt);

					const shouldDisplayYear =
						index === 0 ||
						formatDate(message.createdAt) !==
							formatDate(array[index - 1].createdAt);

					return (
						<div key={message.id}>
							{shouldDisplayYear && <div>{formatDate(message.createdAt)}</div>}
							<strong>{message.writer}: </strong> {message.message}{' '}
							{isLastMessageForWriter && formatTime(message.createdAt)}
						</div>
					);
				})}
			</section>
		</>
	);
};

export default Chat;
