import { useState } from 'react';
import styled from '@emotion/styled';
import { FaVideoSlash } from 'react-icons/fa';
import { FaVideo } from 'react-icons/fa';

const VideoBtn = () => {
	const [isVideoOn, setIsVideoOn] = useState(true);

	const toggleVideo = () => {
		setIsVideoOn((prevState) => !prevState);
	};

	return <VideoBtnWrapper onClick={toggleVideo}>{isVideoOn ? <FaVideo /> : <FaVideoSlash />}</VideoBtnWrapper>;
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
