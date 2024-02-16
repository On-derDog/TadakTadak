import { RoomPreview } from "./RoomPreview";
import styled from '@emotion/styled';
import { RoomsInfo } from '../../stores/useRoomStore';

const RoomPreviewList = () => {

  const roomsInfo = RoomsInfo.getState();
  console.log(roomsInfo.rooms);

	return (
		<RoomPreviewListWrapper>
			<RoomPreviewListSection>

				{/* Grid */}
        <ChattingRoomListGridContainer>
         {roomsInfo.rooms.map((item, index) => (
            <RoomPreview
              key={index}
              roomId={item.roomId}
              roomName={item.roomName}
              description={item.description}
              hashtag={item.hashtag}
            />
          ))}
        </ChattingRoomListGridContainer>

			</RoomPreviewListSection>
		</RoomPreviewListWrapper>
	)
};

export default RoomPreviewList;


const RoomPreviewListWrapper = styled.main`
  height: 100%;
  width: 100%;
`

const RoomPreviewListSection = styled.section`
`

export const ChattingRoomListGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  padding: 1.25rem;
`;