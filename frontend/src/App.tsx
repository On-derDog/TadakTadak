import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { GlobalStyle } from './styles/GlobalStyle';
import { Global } from '@emotion/react';

import ChatRoomInfo from './components/chatRoomInfo/ChatRoomInfo';

import ChattingListPage from './pages/ChattingListPage';
import ChattingRoomPage from './pages/ChattingRoomPage';
import ErrorPage from './pages/ErrorPage';
import RootPage from './pages/RootPage';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import Signupnaver from './pages/Signupnaver';
import VideoCallPage from './pages/VideoCallPage';
import WelcomePage from './pages/WelcomePage';

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
