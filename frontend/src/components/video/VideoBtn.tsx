import { FaVideoSlash } from 'react-icons/fa';
import { FaVideo } from 'react-icons/fa';

import styled from '@emotion/styled';

import { useVideoCallStore } from '../../stores/useVideoCallStore';

const VideoBtn = () => {
  const { videoEnabled, setVideoEnabled } = useVideoCallStore();

  const toggleVideo = () => {
    setVideoEnabled(!videoEnabled);
  };

  return (
    <VideoBtnWrapper onClick={toggleVideo}>
      {videoEnabled ? <FaVideo /> : <FaVideoSlash />}
    </VideoBtnWrapper>
  );
};

export default VideoBtn;

const VideoBtnWrapper = styled.div`
  cursor: pointer;
  width: 50px;
  height: 50px;
  background-color: gray;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5rem;
`;
