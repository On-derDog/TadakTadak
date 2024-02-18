import React, { useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import DefaultUserSVG from '../../assets/DefaultUser.svg';

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
			<VideoContainer>
				{stream ? (
					<Video id={id} ref={videoRef} autoPlay />
				) : (
					<EmptyVideoImage src={DefaultUserSVG} alt="Empty Video" />
				)}
				<VideoTitle>{id === 'localvideo' ? 'My Video' : userId}</VideoTitle>
			</VideoContainer>
		</VideoBoxWrapper>
	);
};

export default VideoBox;

const VideoBoxWrapper = styled.div`
	width: 50%;
	height: 50%;
	background-color: white;
	display: flex;
	flex-direction: column;
	position: relative;
`;

const VideoContainer = styled.div`
	position: relative;
`;

const Video = styled.video`
	border-radius: 10px;
	width: 100%;
	height: auto;
`;

const EmptyVideoImage = styled.img`
	border-radius: 10px;
	width: 100%;
	height: auto;
`;

const VideoTitle = styled.div`
	text-align: center;
	position: absolute;
	bottom: 5px;
	left: 0;
	right: 0;
	margin: auto;
	background-color: rgba(255, 255, 255, 0.4);
	padding: 5px 10px;
	border-radius: 0px, 0px, 0px, 0px;
	white-space: nowrap;
`;
