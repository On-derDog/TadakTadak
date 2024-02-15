import { create } from 'zustand';
import { devtools, persist } from "zustand/middleware";

export interface RoomInfo {
 roomId: string;
 roomName: string;
 description: string;
 participation : string;
 capacity: number;
 owner: string;

 updateRoomId: (roomId: RoomInfo['roomId']) => void;
 updateRoomName: (roomName: RoomInfo['roomName']) => void;
 updateDescription: (description: RoomInfo['description']) => void;
 updateParticipationn: (participation: RoomInfo['participation']) => void;
 updateCapacity: (capacity: RoomInfo['capacity']) => void;
 updateOwner: (owner: RoomInfo['owner']) => void;
}

const createRoomStore = (set) => ({
  roomId: '',
  roomName: '',
  description: '',
  participation: '',
  capacity: 1,
  owner: '',
  updateRoomId: (roomId: string) => set({ roomId }),
  updateRoomName: (roomName: string) => set({ roomName }),
  updateDescription: (description: string) => set({ description }),
  updateParticipationn: (participation: string) => set({ participation }),
  updateCapacity: (capacity: number) => set({ capacity }),
  updateOwner: (owner: string) => set({ owner }),
});

let roomInfoTemp;

//devtools
if (import.meta.env.DEV) {
  roomInfoTemp = create<RoomInfo>()(devtools(createRoomStore, { name: 'roomInfo' }));
} else {
  roomInfoTemp = create<RoomInfo>()(createRoomStore);
}

export const RoomInfo = roomInfoTemp;