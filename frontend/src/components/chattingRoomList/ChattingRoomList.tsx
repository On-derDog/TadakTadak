import { ChattingRoom } from "./ChattingRoom";
import styled from '@emotion/styled';

const ChattingRoomList: React.FC = () => {
	return (
		<main className="ChattingRoomList-wrapper">
			<section className="ChattingRoomList-container">
				<h3>This is ChattingRoomList Component!</h3>
				<span>방 4*4로 배치하기</span>

				{/* Grid */}
        <ChattingRoomListGridContainer>
          {Array.from({ length: 16 }).map((_, index) => (
            <ChattingRoom key={index} />
          ))}
        </ChattingRoomListGridContainer>

			</section>
		</main>
	)
};

export default ChattingRoomList;


export const ChattingRoomListGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
`;