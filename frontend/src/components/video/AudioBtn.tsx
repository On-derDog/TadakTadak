import { useState } from 'react';
import styled from '@emotion/styled';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const AudioBtn = () => {
	const [isAudioOn, setIsAudioOn] = useState(false);

	const toggleAudio = () => {
		setIsAudioOn((prevState) => !prevState);
	};

	return <AudioBtnWrapper onClick={toggleAudio}>{isAudioOn ? <FaVolumeUp /> : <FaVolumeMute />}</AudioBtnWrapper>;
};

export default AudioBtn;

const AudioBtnWrapper = styled.div`
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
