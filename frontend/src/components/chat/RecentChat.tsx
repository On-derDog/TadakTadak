interface ChatMessage {
	writer: string;
	message: string;
	createdAt: Date | string;
}

const DUMMY_DATA: ChatMessage[] = [
	{
		writer: '감자',
		message: '헬로',
		createdAt: '2023-12-31T23:57:59',
	},
	{
		writer: '감자',
		message: '점메추',
		createdAt: '2023-12-31T23:57:59',
	},
	{
		writer: '감자',
		message: '점메추123',
		createdAt: '2023-12-31T23:59:59',
	},
	{
		writer: '고구마',
		message: '헬로',
		createdAt: '2023-12-31T23:59:59',
	},
	{
		writer: '고구마',
		message: '점메추',
		createdAt: '2024-01-01T00:05:59',
	},
	{
		writer: '고구마',
		message: '점메추',
		createdAt: '2024-01-01T00:07:59',
	},
];

const RecentChat: React.FC = () => {
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
					array[index + 1].writer !== item.writer ||
					array[index + 1].createdAt !== item.createdAt;

				const shouldDisplayYear = formattedDate !== currentFormattedDate;

				currentFormattedDate = formattedDate;

				return (
					<div key={index}>
						{shouldDisplayYear && <div>{formattedDate}</div>}
						<strong>{item.writer}: </strong> {item.message}{' '}
						{isLastMessageForWriter && formattedTime}
					</div>
				);
			})}
			<div>---- 이전 채팅 기록입니다. ----</div>
		</>
	);
};

export default RecentChat;
