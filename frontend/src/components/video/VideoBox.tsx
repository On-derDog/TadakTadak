import React, { useRef, useEffect } from 'react';
import styled from '@emotion/styled';

interface VideoBoxProps {
	id: string;
	stream: MediaStream | null;
	userId: string | null;
}

const VideoBox: React.FC<VideoBoxProps> = ({ id, stream, userId }) => {
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		if (stream && videoRef.current) {
			videoRef.current.srcObject = stream;
		}
	}, [stream]);

	return (
		<VideoBoxWrapper>
			<video id={id} ref={videoRef} autoPlay />
			<VideoTitle>{id === 'localvideo' ? 'My Video' : userId}</VideoTitle>
		</VideoBoxWrapper>
	);
};

export default VideoBox;

const VideoBoxWrapper = styled.div`
	width: 90%;
	height: 90%;
	background-color: white
	display: flex;
	flex-direction: column;
`;

const VideoTitle = styled.div`
	text-align: center;
`;
