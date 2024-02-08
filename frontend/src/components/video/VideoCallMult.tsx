import { useEffect, useRef, useState } from 'react';

const VideoCall = () => {
	const socketRef = useRef<WebSocket>();
	const myVideoRef = useRef<HTMLVideoElement>(null);
	const remoteVideoRefs = useRef<{ [userId: string]: HTMLVideoElement }>({});
	const myId = Math.floor(Math.random() * 1000).toString();
	const pcRefs = useRef<{ [userId: string]: RTCPeerConnection }>({});

	const [audioEnabled] = useState(true);
	const [videoEnabled] = useState(true);

	const getMedia = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: videoEnabled,
				audio: audioEnabled,
			});

			if (myVideoRef.current) {
				myVideoRef.current.srcObject = stream;
			}

			for (const userId of Object.keys(pcRefs.current)) {
				for (const track of stream.getTracks()) {
					pcRefs.current[userId].addTrack(track, stream);
				}
			}
		} catch (e) {
			console.error(e);
		}
	};

	const createPeerConnection = (userId: string) => {
		pcRefs.current[userId] = new RTCPeerConnection({
			iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
		});

		pcRefs.current[userId].addEventListener('icecandidate', (e) => {
			if (e.candidate && socketRef.current) {
				socketRef.current.send(
					JSON.stringify({
						fromUserId: myId,
						toUserId: userId,
						type: 'ice',
						candidate: e.candidate,
					}),
				);
			}
		});

		pcRefs.current[userId].addEventListener('track', (e) => {
			if (remoteVideoRefs.current[userId]) {
				remoteVideoRefs.current[userId].srcObject = e.streams[0];
			}
		});
	};

	useEffect(() => {
		socketRef.current = new WebSocket('ws://localhost:8080/signal/1');
		getMedia();

		socketRef.current.onopen = () => {
			console.log('WebSocket connected');

			const message = {
				fromUserId: myId,
				type: 'join',
				roomId: '1',
				candidate: null,
				sdp: null,
			};

			socketRef.current?.send(JSON.stringify(message));
		};

		socketRef.current.onmessage = (event) => {
			const message = JSON.parse(event.data);
			switch (message.type) {
				case 'offer':
					console.log('recv Offer');
					if (!pcRefs.current[message.fromUserId]) {
						createPeerConnection(message.fromUserId);
					}
					pcRefs.current[message.fromUserId]
						.setRemoteDescription(new RTCSessionDescription(message.sdp))
						.then(() => createAnswer(message.fromUserId))
						.catch((error) => console.error('Error setting remote description:', error));
					break;
				case 'answer':
					console.log('recv Answer');
					pcRefs.current[message.fromUserId]
						.setRemoteDescription(new RTCSessionDescription(message.sdp))
						.catch((error) => console.error('Error setting remote description:', error));
					break;
				case 'ice':
					console.log('recv ICE Candidate');
					if (!pcRefs.current[message.fromUserId]) {
						createPeerConnection(message.fromUserId);
					}
					pcRefs.current[message.fromUserId]
						.addIceCandidate(new RTCIceCandidate(message.candidate))
						.catch((error) => console.error('Error adding ICE candidate:', error));
					break;
				default:
					break;
			}
		};

		socketRef.current.onclose = () => {
			console.log('WebSocket disconnected');
		};

		return () => {
			if (socketRef.current) {
				socketRef.current.close();
			}
		};
	}, []);

	const createAnswer = (userId: string) => {
		pcRefs.current[userId]
			.createAnswer()
			.then((answer) => {
				return pcRefs.current[userId].setLocalDescription(answer);
			})
			.then(() => {
				const message = {
					fromUserId: myId,
					toUserId: userId,
					type: 'answer',
					roomId: '1',
					candidate: null,
					sdp: pcRefs.current[userId].localDescription,
				};
				socketRef.current?.send(JSON.stringify(message));
			})
			.catch((error) => console.error('Error creating answer:', error));
	};

	return (
		<div
			id="Wrapper"
			style={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
			}}
		>
			<video
				id="localvideo"
				style={{ width: 200, height: 200, backgroundColor: 'black' }}
				ref={myVideoRef}
				autoPlay
				muted
			/>
			<div>
				{Object.keys(remoteVideoRefs.current).map((userId) => (
					<video
						key={userId}
						style={{ width: 200, height: 200, backgroundColor: 'black' }}
						ref={(ref) => {
							if (ref) {
								remoteVideoRefs.current[userId] = ref;
							}
						}}
						autoPlay
					/>
				))}
			</div>
		</div>
	);
};

export default VideoCall;
