import styled from '@emotion/styled';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { useVideoCallStore } from '../../stores/useVideoCallStore';

const AudioBtn = () => {
	const { audioEnabled, setAudioEnabled } = useVideoCallStore();

	const toggleAudio = () => {
		setAudioEnabled(!audioEnabled);
	};

	return <AudioBtnWrapper onClick={toggleAudio}>{audioEnabled ? <FaVolumeUp /> : <FaVolumeMute />}</AudioBtnWrapper>;
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
