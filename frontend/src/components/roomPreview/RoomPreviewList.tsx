import { RoomPreview } from "./RoomPreview";
import styled from '@emotion/styled';

const RoomPreviewList = () => {
	return (
		<RoomPreviewListWrapper>
			<RoomPreviewListSection>

				{/* Grid */}
        <ChattingRoomListGridContainer>
          {Array.from({ length: 20 }).map((_, index) => (
            <RoomPreview key={index} />
          ))}
        </ChattingRoomListGridContainer>

			</RoomPreviewListSection>
		</RoomPreviewListWrapper>
	)
};

export default RoomPreviewList;


const RoomPreviewListWrapper = styled.main`

`

const RoomPreviewListSection = styled.section`
`

export const ChattingRoomListGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
`;