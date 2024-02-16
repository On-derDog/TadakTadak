import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
// import { useNotification } from 'web-notification';
import axios from "axios"
import { GetAllRoomsApis } from '../../hooks/useGetAllRoom';
import { useNavigate } from 'react-router-dom';


export const RoomPreview = ({roomId, roomName, description, hashtag}:{roomId:string, roomName:string, description:string, hashtag: string}) =>{

  const navigate = useNavigate();
  
  // 에러가 발생하면 react-query update를 하기
  const { isLoading, data, isError } = useQuery({
    queryKey: ["GetAllRoomsApis"],
    queryFn: GetAllRoomsApis.getAllRooms,
    staleTime: 5 * 1000 
  });
  const thumbnailUrl = data?.thumbnailUrl;
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>에러</div>;
  }

  const handlieRoomClick = () => {
    navigate(`/chatroom/${roomId.toString()}`);
  }

  return(
    <main className="ChattingRoom-wrapper" onClick={handlieRoomClick}>
      <section className="ChattingRoom-container">
        {/* 이미지 썸네일 */}
        <div className="ChattingRoom-image">
          {thumbnailUrl && <img src={thumbnailUrl} alt="썸네일" />}
        </div>

        {/* 채팅룸 설명 */}
        <div className="ChattingRoom-detail">
          <span className="ChattingRoom-title">{roomName}</span><br/>
          <span className="ChattingRoom-bookmark">즐겨찾기</span><br/>
          <span className="ChattingRoom-info">{description}</span><br/>
          <span className=" ChattingRoom-category">{hashtag}</span>
        </div>
      </section>
    </main>
  )
}