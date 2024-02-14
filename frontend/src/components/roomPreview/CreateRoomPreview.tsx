import React from 'react';
import { InputForm } from '../../components/auth/InputForm';
import axios from 'axios';

interface CreateRoomPreviewProps {
  onClose: () => void;
  onAddRoom: () => void;
  username: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  newRoom: { roomName: string; description:string; owner:string; hashtag: string; capacity: number; };
}

const CreateRoomPreview: React.FC<CreateRoomPreviewProps> = ({ onClose, onAddRoom, newRoom, username, handleInputChange }) => {
  const handleAddRoomClick = async () => {
    try {
      const roomWithOwner = { ...newRoom, owner: username };
      console.log(roomWithOwner);
      await axios.post('http://localhost:8001/user-service/create', roomWithOwner);

      onAddRoom();
      onClose();
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  return (
    <section>
      <button onClick={onClose}>Close Modal</button>
      <h1>Create Room</h1>
      <InputForm type="text" name="roomName" value={newRoom.roomName} title="방 이름" onChange={handleInputChange} />
      <InputForm type="text" name="description" value={newRoom.description} title="방 설명" onChange={handleInputChange} />
      <InputForm type="text" name="hashtag" value={newRoom.hashtag} title="해시태그" onChange={handleInputChange} />
      <InputForm
        type="number"
        name="capacity"
        value={newRoom.capacity.toString()}
        title="인원 수"
        onChange={handleInputChange}
      />
      <button onClick={handleAddRoomClick}>Create Room</button>
    </section>
  );
};

export default CreateRoomPreview;
