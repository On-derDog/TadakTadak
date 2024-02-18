import VideoCall from '../components/video/VideoCall';
import styled from '@emotion/styled';

const VideoCallPage = () => {
	return (
		<VideoCallWrapper>
			<VideoCall />
		</VideoCallWrapper>
	);
};

export default VideoCallPage;

const VideoCallWrapper = styled.div`
	width: 100%;
	height: 100%;
`;
