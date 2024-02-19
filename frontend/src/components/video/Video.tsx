import { useEffect, useRef, useState } from 'react';

const VideoCall = () => {
	// 상태 및 참조 변수 선언
	const socketRef = useRef<WebSocket>();
	const myVideo = useRef<HTMLVideoElement>(null);
	const remoteVideo = useRef<HTMLVideoElement>(null);
	const myId = Math.floor(Math.random() * 1000).toString();
	const pcRef = useRef<RTCPeerConnection>(
		new RTCPeerConnection({
			iceServers: [
				{
					urls: [
						'stun:stun.l.google.com:19302',
						'stun:stun1.l.google.com:19302',
						'stun:stun2.l.google.com:19302',
						'stun:stun3.l.google.com:19302',
						'stun:stun4.l.google.com:19302',
					],
				},
			],
		}),
	);
	const [audioEnabled, setAudioEnabled] = useState(true);
	const [videoEnabled, setVideoEnabled] = useState(true);

	// 미디어 가져오기 함수 정의
	const getMedia = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: videoEnabled,
				audio: audioEnabled,
			});

			if (myVideo.current) {
				myVideo.current.srcObject = stream;
			}

			stream.getTracks().forEach((track) => {
				pcRef.current?.addTrack(track, stream);
			});

			pcRef.current.onicecandidate = handleIceCandidate;
			pcRef.current.ontrack = handleTrack;

			createOffer();
		} catch (e) {
			console.error(e);
		}
	};

	// Offer 생성 함수 정의
	const createOffer = async () => {
		console.log('Creating Offer...');
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
			console.log('Offer sent');
		} catch (e) {
			console.error('Error creating Offer:', e);
		}
	};

	// Answer 생성 함수 정의
	const createAnswer = async (offerSdp: RTCSessionDescriptionInit) => {
		console.log('Creating Answer...');
		try {
			await pcRef.current.setRemoteDescription(new RTCSessionDescription(offerSdp));

			const answerSdp = await pcRef.current.createAnswer();
			await pcRef.current.setLocalDescription(answerSdp);

			console.log('Sending Answer...');

			const message = {
				fromUserId: myId,
				type: 'answer',
				roomId: '1',
				candidate: null,
				sdp: pcRef.current.localDescription,
			};

			socketRef.current?.send(JSON.stringify(message));
		} catch (e) {
			console.error('Error creating Answer:', e);
		}
	};

	// WebSocket 이벤트 핸들러 함수 정의
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

		socketRef.current.onmessage = handleSocketMessage;
		socketRef.current.onclose = () => {
			console.log('WebSocket disconnected');
		};

		return () => {
			if (socketRef.current) {
				socketRef.current.close();
			}
		};
	}, []);

	// ICE Candidate 이벤트 핸들러 함수 정의
	const handleIceCandidate = (e: RTCPeerConnectionIceEvent) => {
		if (e.candidate && socketRef.current) {
			console.log('Sending ICE Candidate...');
			const message = {
				fromUserId: myId,
				type: 'ice',
				roomId: '1',
				candidate: e.candidate,
			};
			socketRef.current.send(JSON.stringify(message));
		}
	};

	// Track 이벤트 핸들러 함수 정의
	const handleTrack = (e: RTCTrackEvent) => {
		if (remoteVideo.current) {
			remoteVideo.current.srcObject = e.streams[0];
		}
	};

	// WebSocket 메시지 이벤트 핸들러 함수 정의
	const handleSocketMessage = (event: MessageEvent) => {
		const message = JSON.parse(event.data);
		switch (message.type) {
			case 'offer':
				console.log('Received Offer');
				createAnswer(message.sdp);
				break;
			case 'answer':
				console.log('Received Answer');
				pcRef.current?.setRemoteDescription(new RTCSessionDescription(message.sdp));
				break;
			case 'ice':
				console.log('Received ICE Candidate');
				pcRef.current
					?.addIceCandidate(new RTCIceCandidate(message.candidate))
					.then(() => {
						console.log('ICE Candidate added successfully.');
						console.log(message.candidate);
					})
					.catch((error) => {
						console.error('Error adding ICE Candidate:', error);
					});
				break;
			default:
				break;
		}
	};

	// 렌더링
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
				ref={myVideo}
				autoPlay
				muted
			/>
			<video
				id="remotevideo"
				style={{ width: 200, height: 200, backgroundColor: 'black' }}
				ref={remoteVideo}
				autoPlay
			/>
		</div>
	);
};

export default VideoCall;
