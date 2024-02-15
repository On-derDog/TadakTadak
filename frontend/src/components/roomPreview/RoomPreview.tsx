import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
// import { useNotification } from 'web-notification';
import axios from "axios"
import { GetAllRoomsApis } from '../../hooks/useGetAllRoom';


// const getImage = async () => {
//   try {
//     const response = await axios.get('/thumbnails'); 
//     const data = response.data;
//     return data.imageUrl;
//   } catch (error) {
//     console.error('Error fetching image:', error);
//   }
// };


export const RoomPreview = ({roomName, description, hashtag}:{roomName:string, description:string, hashtag: string}) =>{
  
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

  return(
    <main className="ChattingRoom-wrapper">
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