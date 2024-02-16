import { RoomPreview } from "./RoomPreview";
import styled from '@emotion/styled';
import { RoomsInfo } from '../../stores/useRoomStore';
import { useEffect } from "react";

const RoomPreviewList = ({ roomsPreviewListData, refetchRooms }) => {

  useEffect(() => {
    console.log(roomsPreviewListData);
  }, [roomsPreviewListData]); 

	return (
		<RoomPreviewListWrapper>

				{/* Grid */}
        <ChattingRoomListGridContainer>
         {roomsPreviewListData?.map((item, index) => (
            <RoomPreview
              key={index}
              roomId={item.roomId}
              roomName={item.roomName}
              description={item.description}
              hashtag={item.hashtag}
            />
          ))}
        </ChattingRoomListGridContainer>

		</RoomPreviewListWrapper>
	)
};

export default RoomPreviewList;


const RoomPreviewListWrapper = styled.main`
  height: 100%;
  width: 100%;
`

const ChattingRoomListGridContainer = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  display: grid;
  align-items: start;
  justify-items: start; 
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  padding: 1.25rem;
`;