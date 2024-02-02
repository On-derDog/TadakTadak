import { Message } from '../../interface/ChatInterface';

// type ChatMessageListProps = {
// 	messages: Message[];
// };

const ChatMessage = (
	{
		/*props: ChatMessageListProps*/
	},
) => {
	// const { messages } = props;
	let currentFormattedDate = '';
	return (
		<>
			{DUMMY_DATA.map((item, index, array) => {
				const date = new Date(item.createdAt);

				const formattedDate = date.toLocaleDateString('ko-KR', {
					year: 'numeric',
					month: 'long',
					day: 'numeric',
				});

				const formattedTime = date.toLocaleTimeString('ko-KR', {
					hour: '2-digit',
					minute: '2-digit',
					hour12: true,
				});

				const isLastMessageForWriter =
					index === array.length - 1 ||
					array[index + 1].sender !== item.sender ||
					array[index + 1].createdAt !== item.createdAt;

				const shouldDisplayYear = formattedDate !== currentFormattedDate;

				currentFormattedDate = formattedDate;

				return (
					<div key={index}>
						{shouldDisplayYear && <div>{formattedDate}</div>}
						<div>
							<strong>{item.sender}: </strong> {item.sender}{' '}
							{isLastMessageForWriter && formattedTime}
						</div>
					</div>
				);
			})}
		</>
	);
};

export default ChatMessage;

const DUMMY_DATA: Message[] = [
	{
		sender: '감자',
		content: '헬로',
		createdAt: '2023-12-31T23:57:59',
	},
	{
		sender: '감자',
		content: '점메추',
		createdAt: '2023-12-31T23:57:59',
	},
	{
		sender: '감자',
		content: '점메추123',
		createdAt: '2023-12-31T23:59:59',
	},
	{
		sender: '고구마',
		content: '헬로',
		createdAt: '2023-12-31T23:59:59',
	},
	{
		sender: '고구마',
		content: '점메추',
		createdAt: '2024-01-01T00:05:59',
	},
	{
		sender: '고구마',
		content: '점메추',
		createdAt: '2024-01-01T00:07:59',
	},
];
