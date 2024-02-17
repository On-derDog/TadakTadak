import styled from '@emotion/styled';
import Skeleton from '@mui/material/Skeleton';

export const RoomPreviewSkeleton = () => (
  <RoomPreviewWrapperSkeleton>
    <PreviewImgSkeleton>
      <Skeleton variant="rectangular" width={100} height={150} />
    </PreviewImgSkeleton>
    <RoomPreviewDetailSkeleton>
      <Skeleton variant="text" width={"90%"} height={30} />
      <Skeleton variant="text" width={"90%"} height={20} />
      <Skeleton variant="text" width={"90%"} height={20} />
    </RoomPreviewDetailSkeleton>
  </RoomPreviewWrapperSkeleton>
);

const RoomPreviewWrapperSkeleton = styled.main`
  width: 100%;
  min-width: 6.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const RoomPreviewDetailSkeleton = styled.section`
  display: flex;
  width: 100%;
  height: 5.3125rem;
  padding: 0.625rem 1.5rem;
  flex-direction: column;
  flex-shrink: 0;
  gap: 0.25rem;
  box-sizing: border-box;
  border-radius: 0.0625rem;
  border: 1px solid var(--color-mercury);
  background: var(--color-wildsand);
  justify-content: center;
  align-items: center;
`;

const PreviewImgSkeleton = styled.div`
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

  svg {
    width: 18px;
    height: 19px;
    fill: none;
    stroke: var(--color-mercury);
    stroke-width: 1.5;
    animation: skeleton-animation 1.5s infinite ease-in-out;
  }

  @keyframes skeleton-animation {
    0% {
      opacity: 0.5;
      transform: translateX(-100%);
    }
    50% {
      opacity: 1;
      transform: translateX(100%);
    }
    100% {
      opacity: 0.5;
      transform: translateX(-100%);
    }
  }
`;