import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { RoomPreviewSkeleton } from './RoomPreviewSkeleton';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
// import { useNotification } from 'web-notification';
import axios from 'axios';

import { GetAllRoomsApis } from '../../hooks/react-query/useGetAllRoom';

import BookmarkSVG from '../../assets/Bookmark.svg';
import DefaultUserSVG from '../../assets/DefaultUser.svg';

export const RoomPreview = ({
  roomId,
  roomName,
  description,
  hashtag,
}: {
  roomId: string;
  roomName: string;
  description: string;
  hashtag: string;
}) => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('Accesstoken');
  const isLoggedIn = accessToken !== null;

  // 에러가 발생하면 react-query update를 하기
  const { isLoading, data, isError } = useQuery({
    queryKey: ['GetAllRoomsApis'],
    queryFn: GetAllRoomsApis.getAllRooms,
    staleTime: 5 * 1000,
  });
  const thumbnailUrl = data?.thumbnailUrl;

  const handleRoomClick = () => {
    if (isLoggedIn) {
      navigate(`/chatroom/${roomId.toString()}`);
    } else {
      alert('로그인이 필요한 서비스입니다.');
    }
  };

  if (isLoading) {
    return <RoomPreviewSkeleton />;
  }

  if (isError) {
    return <div>에러</div>;
  }

  return (
    <>
      {/* {isLoading && <RoomPreviewSkeleton />} */}
      {!isLoading && !isError && (
        <RoomPreviewWrapper onClick={handleRoomClick}>
          {/* 이미지 썸네일 */}
          <PreviewImg>
            {thumbnailUrl ? (
              <img src={thumbnailUrl} alt='썸네일' />
            ) : (
              <img src={DefaultUserSVG} alt='DefaultUserSVG' />
            )}
          </PreviewImg>

          {/* 채팅룸 설명 */}
          <RoomPreviewDetail>
            <title>
              <h1>{roomName}</h1>
              <img src={BookmarkSVG} alt='BookmarkSVG' />
            </title>
            <p>{description}</p>
            <em>{hashtag}</em>
          </RoomPreviewDetail>
        </RoomPreviewWrapper>
      )}
      {isError && <div>에러</div>}
    </>
  );
};

const RoomPreviewWrapper = styled.main`
  width: 100%;
  min-width: 6.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    filter: brightness(0.9);
  }
`;

const RoomPreviewDetail = styled.section`
  display: flex;
  width: 100%;
  height: 5.3125rem;
  padding: 0.625rem 1.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  gap: 0.25rem;

  box-sizing: border-box;
  color: var(--color-rangoongreen);

  border-radius: 0.0625rem;
  border: 1px solid var(--color-mercury);
  background: var(--color-white);

  title {
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: stretch;
  }

  h1 {
    flex: 1 0 0;
    margin: 0;
    font-size: var(--font-size-sm);
    font-weight: 700;
    align-self: stretch;
    align-self: center;
  }

  p {
    margin: 0;
    font-size: var(--font-size-xxs);
    align-self: stretch;
  }

  em {
    font-size: 0.5rem;
    font-weight: 700;
    align-self: stretch;
  }
`;

const PreviewImg = styled.div`
  width: 100%;
  min-width: 6.25rem;
  height: 8.6875rem;
  flex-shrink: 0;
  border-radius: 0.3125rem;
  background: var(--color-white);
  display: flex;
  justify-content: center;
  align-items: center;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;
