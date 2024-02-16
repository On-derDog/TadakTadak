import { ChattingRoom } from "./ChattingRoom";
import styled from '@emotion/styled';

const ChattingRoomList: React.FC = () => {
	return (
		<main className="ChattingRoomList-wrapper">
			<section className="ChattingRoomList-container">
				<h3>This is ChattingRoomList Component!</h3>

				{/* Grid */}
        <ChattingRoomListGridContainer>
          {Array.from({ length: 20 }).map((_, index) => (
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
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
`;