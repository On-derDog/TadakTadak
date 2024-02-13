import { Message } from '../../interface/ChatInterface';
import styled from '@emotion/styled';

type ChatMessageListProps = {
	messages: Message[];
	username: string | undefined;
};

const ChatMessage = ({ messages, username }: ChatMessageListProps) => {
	let currentFormattedDate = '';

	return (
		<>
			{messages.map((item, index, array) => {
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
					new Date(array[index + 1].createdAt).toISOString().slice(0, 16) !==
						new Date(item.createdAt).toISOString().slice(0, 16);

				const shouldDisplayYear = formattedDate !== currentFormattedDate;

				currentFormattedDate = formattedDate;

				return (
					<MessageContainer key={index}>
						{shouldDisplayYear && <DateWrapper>{formattedDate}</DateWrapper>}
						<MessageWrapper>
							{/* 추후 코드 본인일 경우 상태관리 추가해야됨 */}
							{item.sender === username ? (
								<ChatReverseWrapper>
									<ChatOwnBox>{item.content}</ChatOwnBox>
									<ChatDateWrapper>
										<FormattedTime>{isLastMessageForWriter && formattedTime}</FormattedTime>
									</ChatDateWrapper>
								</ChatReverseWrapper>
							) : (
								<>
									<ChatSenderWrapper>
										<ChatSender>{item.sender}</ChatSender>
									</ChatSenderWrapper>
									<ChatWrapper>
										<ChatBox>{item.content}</ChatBox>
										<ChatDateWrapper>
											<FormattedTime>{isLastMessageForWriter && formattedTime}</FormattedTime>
										</ChatDateWrapper>
									</ChatWrapper>
								</>
							)}
						</MessageWrapper>
					</MessageContainer>
				);
			})}
		</>
	);
};

export default ChatMessage;

const MessageContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0.5rem;
`;

const DateWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: var(--font-size-xs);
	color: var(--color-rangoongreen);
	margin: 0.5rem;
`;

const MessageWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;
// --------------------------------------

const FormattedTime = styled.span`
	font-size: var(--font-size-xs);
	color: var(--color-rangoongreen);
	margin: 0.1rem;
`;

const ChatSender = styled.span`
	font-weight: 700;
	color: var(--color-rangoongreen);
`;

const ChatSenderWrapper = styled.div`
	margin: 0.1rem 0.1rem 0.3rem 0rem;
`;

const ChatDateWrapper = styled.div`
	display: flex;
	flex-direction: column-reverse;
`;

// --------------------------------------
const ChatWrapper = styled.div`
	display: flex;
	flex-direction: row;
`;

const ChatReverseWrapper = styled.div`
	display: flex;
	flex-direction: row-reverse;
`;
// --------------------------------------
const ChatBoxStyles = `
  max-width: 70%;
  padding: 0.5rem;
  word-wrap: break-word;
  font-size: var(--font-size-sm);
`;

const ChatBox = styled.div`
	${ChatBoxStyles}
	border-radius: 15px 10px 10px 25px;
	background-color: var(--color-mercury);
	color: var(--color-rangoongreen);
`;

const ChatOwnBox = styled.div`
	${ChatBoxStyles}
	border-radius: 10px 15px 25px 10px;
	background-color: var(--color-crusta);
	color: var(--color-white);
`;

// const DUMMY_DATA: Message[] = [
// 	{
// 		sender: '감자',
// 		content: '헬로',
// 		createdAt: '2023-12-31T23:57:59',
// 	},
// 	{
// 		sender: '감자',
// 		content: '점메추',
// 		createdAt: '2023-12-31T23:57:59',
// 	},
// 	{
// 		sender: '감자',
// 		content: '점메추123',
// 		createdAt: '2023-12-31T23:59:59',
// 	},
// 	{
// 		sender: '고구마',
// 		content: '헬로',
// 		createdAt: '2023-12-31T23:59:59',
// 	},
// 	{
// 		sender: '고구마',
// 		content: '점메추',
// 		createdAt: '2024-01-01T00:05:59',
// 	},
// ];
