import React, { useRef, useEffect } from 'react';
import styled from '@emotion/styled';

interface VideoBoxProps {
	id: string;
	stream: MediaStream | null;
}

const VideoBox: React.FC<VideoBoxProps> = ({ id, stream }) => {
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		if (stream && videoRef.current) {
			videoRef.current.srcObject = stream;
		}
	}, [stream]);

	return (
		<VideoBoxWrapper>
			<video
				id={id}
				style={{ width: 200, height: 200, backgroundColor: 'black' }}
				ref={videoRef}
				autoPlay
			/>
			<VideoTitel>{id}</VideoTitel>
		</VideoBoxWrapper>
	);
};

export default VideoBox;

const VideoBoxWrapper = styled.div`
	width: 300;
	height: 300;
	backgroundcolor: black;
	display: flex;
	flex-direction: column;
`;

const VideoTitel = styled.div``;
