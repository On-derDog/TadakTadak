import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

export const enterChatRoom = async (): Promise<Stomp.Client> => {
	return new Promise((resolve, reject) => {
		const sock = new SockJS('http://localhost:8080/1/enter/1');
		const stompClient = Stomp.over(sock);

		stompClient.connect(
			{},
			() => {
				console.log('Connected to the chat room!');
				resolve(stompClient);
			},
			(error: any) => {
				console.error('Error connecting to the chat room:', error);
				reject(error);
			},
		);
	});
};
