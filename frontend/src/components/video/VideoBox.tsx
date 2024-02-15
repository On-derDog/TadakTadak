import { useEffect, useRef } from 'react';
import styled from '@emotion/styled';

interface VideoBoxProps {
	id: string;
	stream: MediaStream | null;
	isLocal: boolean;
}

const VideoBox: React.FC<VideoBoxProps> = ({ id, stream, isLocal }) => {
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		if (videoRef.current && stream) {
			videoRef.current.srcObject = stream;
		}
	}, [stream]);

	return (
		<VideoBoxWrapper>
			<Video
				id={id}
				style={{ width: 200, height: 200, backgroundColor: 'black' }}
				ref={videoRef}
				autoPlay
				muted={isLocal}
			/>
		</VideoBoxWrapper>
	);
};

export default VideoBox;

const VideoBoxWrapper = styled.div`
	/* VideoBox 스타일링을 위한 CSS 추가 가능 */
`;

const Video = styled.video`
	/* 비디오 스타일링을 위한 CSS 추가 가능 */
`;
