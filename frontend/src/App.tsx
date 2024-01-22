import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootPage from './pages/RootPage';
import WelcomePage from './pages/WelcomePage';
import ErrorPage from './pages/ErrorPage';
import ChattingListPage from './pages/ChattingListPage';
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';
import ChattingRoomPage from './pages/ChattingRoomPage';
import SignUpKakaoPage from './pages/SignUpKaKaoPage';

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
			{ path: 'signupkakao', element: <SignUpKakaoPage /> },

		],
	},
]);

const App = () => {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
};

export default App;
