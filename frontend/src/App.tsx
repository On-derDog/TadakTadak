import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootPage from './pages/RootPage';
import WelcomePage from './pages/WelcomePage';
import ErrorPage from './pages/ErrorPage';
import ChattingListPage from './pages/ChattingListPage';
import SignupPage from './pages/SignupPage';
import ChattingRoomPage from './pages/ChattingRoomPage';
import Signupnaver from './pages/Signupnaver';
import SigninPage from './pages/SigninPage';
import VideoCallPage from './pages/VideoCallPage';
import { Global } from '@emotion/react';
import { GlobalStyle } from './styles/GlobalStyle';
import ChatRoomInfo from './components/chatRoomInfo/ChatRoomInfo';

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootPage />,
		id: 'root',
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <WelcomePage /> },
			{ path: 'signin', element: <SigninPage /> },
			{ path: 'signup', element: <SignupPage /> },
			{ path: 'chattinglist', element: <ChattingListPage /> },
			{ path: 'chatroom/:chatroom_id', element: <ChattingRoomPage /> },
			{ path: 'signupnaver', element: <Signupnaver /> },
			{ path: 'videocall', element: <VideoCallPage /> },
			{ path: 'chatroominfo', element: <ChatRoomInfo /> },
		],
	},
]);

const App = () => {
	return (
		<>
			<Global styles={GlobalStyle} />
			<RouterProvider router={router} />
		</>
	);
};

export default App;
