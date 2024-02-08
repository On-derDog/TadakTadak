import { useEffect, useRef, useState } from 'react';

const VideoCall = () => {
	const socketRef = useRef<WebSocket>();
	const myVideoRef = useRef<HTMLVideoElement>(null);
	const remoteVideoRef = useRef<HTMLVideoElement>(null);
	const myId = Math.floor(Math.random() * 1000).toString();
	const pcRef = useRef<RTCPeerConnection>(
		new RTCPeerConnection({
			iceServers: [
				{
					urls: 'stun:stun.l.google.com:19302',
				},
			],
		}),
	);

	const [audioEnabled, setAudioEnabled] = useState(true);
	const [videoEnabled, setVideoEnabled] = useState(true);

	const getMedia = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: videoEnabled,
				audio: audioEnabled,
			});

			if (myVideoRef.current) {
				myVideoRef.current.srcObject = stream;
			}

			stream.getTracks().forEach((track) => {
				pcRef.current?.addTrack(track, stream);
			});

			pcRef.current.onicecandidate = (e) => {
				if (e.candidate && socketRef.current) {
					console.log('send candidate');
					const message = {
						fromUserId: myId,
						type: 'ice',
						roomId: '1',
						candidate: e.candidate,
					};
					socketRef.current.send(JSON.stringify(message));
				}
			};

			pcRef.current.ontrack = (e) => {
				if (remoteVideoRef.current) {
					remoteVideoRef.current.srcObject = e.streams[0];
				}
			};

			createOffer();
		} catch (e) {
			console.error(e);
		}
	};

	const createOffer = async () => {
		console.log('create Offer');
		try {
			const sdp = await pcRef.current.createOffer();
			await pcRef.current.setLocalDescription(sdp);

			const message = {
				fromUserId: myId,
				type: 'offer',
				roomId: '1',
				candidate: null,
				sdp: pcRef.current.localDescription,
			};

			socketRef.current?.send(JSON.stringify(message));
			console.log('sent the offer');
		} catch (e) {
			console.error(e);
		}
	};

	const createAnswer = async (offerSdp: RTCSessionDescriptionInit) => {
		console.log('createAnswer');
		try {
			await pcRef.current.setRemoteDescription(new RTCSessionDescription(offerSdp));

			const answerSdp = await pcRef.current.createAnswer();
			await pcRef.current.setLocalDescription(answerSdp);

			console.log('sent the answer');

			const message = {
				fromUserId: myId,
				type: 'answer',
				roomId: '1',
				candidate: null,
				sdp: pcRef.current.localDescription,
			};

			socketRef.current?.send(JSON.stringify(message));
		} catch (e) {
			console.error(e);
		}
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
					createAnswer(message.sdp);
					break;
				case 'answer':
					console.log('recv Answer');
					pcRef.current?.setRemoteDescription(new RTCSessionDescription(message.sdp));
					break;
				case 'ice':
					console.log('recv ICE Candidate');
					pcRef.current
						?.addIceCandidate(new RTCIceCandidate(message.candidate))
						.then(() => {
							console.log('Ice Candidate added successfully.');
							console.log(message.candidate);
						})
						.catch((error) => {
							console.error('Error adding Ice Candidate:', error);
						});
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
			<video
				id="remotevideo"
				style={{ width: 200, height: 200, backgroundColor: 'black' }}
				ref={remoteVideoRef}
				autoPlay
			/>
		</div>
	);
};

export default VideoCall;
