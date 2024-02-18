import React, { useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import DefaultUserSVG from '../../assets/DefaultUser.svg';
import { useVideoCallStore } from '../../stores/useVideoCallStore';

interface VideoBoxProps {
	id: string;
	stream: MediaStream | null;
	userId: string | null;
}

const VideoBox: React.FC<VideoBoxProps> = ({ id, stream, userId }) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const { videoEnabled } = useVideoCallStore();

	useEffect(() => {
		if (stream && videoRef.current) {
			videoRef.current.srcObject = stream;
		}
	}, [stream]);

	return (
		<VideoBoxWrapper>
			{stream ? (
				<VideoContainer>
					{id === 'localvideo' && !videoEnabled ? (
						<DefaultWrapper>
							<EmptyVideoImage src={DefaultUserSVG} alt="Empty Video" />
						</DefaultWrapper>
					) : (
						<Video id={id} ref={videoRef} autoPlay muted={id === 'localvideo'} />
					)}
					<VideoTitle>{id === 'localvideo' ? 'My Video' : userId}</VideoTitle>
				</VideoContainer>
			) : (
				<DefaultWrapper>
					<EmptyVideoImage src={DefaultUserSVG} alt="Empty Video" />
				</DefaultWrapper>
			)}
		</VideoBoxWrapper>
	);
};

export default VideoBox;

const VideoBoxWrapper = styled.div`
	border-radius: 10px;
	width: 100%;
	height: 50%;
	background-color: var(--color-white);
	display: flex;
	align-items: center;
	flex: 1;
`;

const VideoContainer = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Video = styled.video`
	border-radius: 10px;
	width: 80%;
	height: 100%;
`;

const VideoTitle = styled.div`
	text-align: center;
	position: absolute;
	height: 1rem;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: rgba(255, 255, 255, 0.5);
	padding: 10px;
	border-radius: 0;
	z-index: 1;
`;

const DefaultWrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const EmptyVideoImage = styled.img``;
