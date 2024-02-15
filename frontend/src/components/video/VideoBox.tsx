import React, { useRef, useEffect } from 'react';

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
		<video
			id={id}
			style={{ width: 200, height: 200, backgroundColor: 'black' }}
			ref={videoRef}
			autoPlay
		/>
	);
};

export default VideoBox;
