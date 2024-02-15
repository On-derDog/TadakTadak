import { RoomPreview } from "./RoomPreview";
import styled from '@emotion/styled';
import { RoomsInfo } from '../../stores/useRoomStore';
import { useStore } from "zustand";

const RoomPreviewList = () => {
  const roomsInfo = useStore(RoomsInfo);

	return (
		<RoomPreviewListWrapper>
			<RoomPreviewListSection>

				{/* Grid */}
        <ChattingRoomListGridContainer>
         {roomsInfo.rooms.map((item, index) => (
            <RoomPreview
              key={index}
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

`

const RoomPreviewListSection = styled.section`
`

export const ChattingRoomListGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
`;