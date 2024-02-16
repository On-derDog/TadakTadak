import React from 'react';
import { InputForm } from '../../components/auth/InputForm';
import axios from 'axios';
import styled from "@emotion/styled"
import Close from "../../assets/Close.svg"
import { Button } from '../common/Button';
import { RoomInfo } from '../../stores/useRoomStore';

interface CreateRoomPreviewProps {
  onClose: () => void;
  onAddRoom: () => void;
  roominfo: RoomInfo;
  username: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  newRoom: { roomName: string; description:string; owner:string; category: string; capacity: number; };
}

const CreateRoomPreview: React.FC<CreateRoomPreviewProps> = ({ onClose, onAddRoom, roominfo, username, handleInputChange }) => {
  const handleAddRoomClick = async () => {
    try {
      const roomWithOwner = { ...roominfo, owner: username };
      console.log(roomWithOwner);
      await axios.post('http://localhost:8002/chatroom-service/create', roomWithOwner);

      onAddRoom();
      onClose();
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  const handleCloseClick = () => {
    onClose();
  }

  return (
    <CreateRoomPreviewWrapper>
      <StyledCloseButton onClick={handleCloseClick} >
        <img src={Close} alt='Close' width="16px"/>
      </StyledCloseButton>
      <h1>Create Room</h1>
      <InputForm type="text" name="roomName" value={roominfo.roomName} title="방 이름" onChange={handleInputChange} />
      <InputForm type="text" name="description" value={roominfo.description} title="방 설명" onChange={handleInputChange} />
      <InputForm type="text" name="hashtag" value={roominfo.hashtag} title="해시태그" onChange={handleInputChange} />
      <InputForm
        type="number"
        name="capacity"
        value={roominfo.capacity.toString()}
        title="인원 수"
        onChange={handleInputChange}
      />
      <br/>
      <Button onClick={handleAddRoomClick} label="Create Room" backgroundColor="primary"/>
    </CreateRoomPreviewWrapper>
  );
};

export default CreateRoomPreview;

const CreateRoomPreviewWrapper = styled.main`
  z-index:1000;
  position: fixed; 
  top: 50%; 
  left: 30%; 
  transform: translate(-50%, -50%); 
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-shrink: 0;
  padding: 2rem;
  border: solid 1px var(--color-wildsand);
  border-radius: 0.3125rem;
  background: var(--color-white);

  h1 {
    color: #000;
    text-align: center;
    font-size: 1rem;
    font-weight: 400;
  }
`

const StyledCloseButton = styled.button`
  display: flex;
  margin-left: auto;
  border: none;
  background: none;
`;