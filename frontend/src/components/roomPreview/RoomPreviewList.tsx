import { RoomPreview } from "./RoomPreview";
import styled from '@emotion/styled';

const RoomPreviewList = () => {
	return (
		<main className="ChattingRoomList-wrapper">
			<section className="ChattingRoomList-container">
				<h3>This is ChattingRoomList Component!</h3>

				{/* Grid */}
        <ChattingRoomListGridContainer>
          {Array.from({ length: 16 }).map((_, index) => (
            <RoomPreview key={index} />
          ))}
        </ChattingRoomListGridContainer>

			</section>
		</main>
	)
};

export default RoomPreviewList;


export const ChattingRoomListGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
`;