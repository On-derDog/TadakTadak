import React, { useEffect, useRef } from 'react';
import SimplePeer from 'simple-peer';
import io from 'socket.io-client';

const VideoCall: React.FC = () => {
	const localVideoRef = useRef<HTMLVideoElement>(null);
	const remoteVideoRef = useRef<HTMLVideoElement>(null);
	let peer: SimplePeer.Instance | null = null;

	useEffect(() => {
		const serverUrl = 'http://localhost:8080/signal/1';
		const socket = io.connect(serverUrl);

		navigator.mediaDevices
			.getUserMedia({ video: true, audio: true })
			.then((stream) => {
				if (localVideoRef.current) {
					localVideoRef.current.srcObject = stream;
				}

				peer = new SimplePeer({ initiator: true, stream });

				peer.on('signal', (signal: any) => {
					socket.emit('signal', { signal });
				});

				peer.on('data', (data: any) => {
					console.log('Received:', data);
				});

				peer.on('stream', (remoteStream: MediaProvider | null) => {
					if (remoteVideoRef.current) {
						remoteVideoRef.current.srcObject = remoteStream;
					}
				});
			})
			.catch((error) => {
				console.error('Error accessing media devices:', error);
			});

		return () => {
			if (peer) {
				peer.destroy();
			}
			socket.disconnect();
		};
	}, []);

	return (
		<div>
			<video ref={localVideoRef} autoPlay muted playsInline />
			<video ref={remoteVideoRef} autoPlay playsInline />
		</div>
	);
};

export default VideoCall;
