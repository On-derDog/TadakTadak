import { create } from 'zustand';
import { devtools, persist } from "zustand/middleware";

export interface RoomInfo {
 roomId: string;
 roomName: string;
 description: string;
 participation : string;
 capacity: number;
 owner: string;
 hashtag: string;

 updateRoomId: (roomId: RoomInfo['roomId']) => void;
 updateRoomName: (roomName: RoomInfo['roomName']) => void;
 updateDescription: (description: RoomInfo['description']) => void;
 updateParticipationn: (participation: RoomInfo['participation']) => void;
 updateCapacity: (capacity: RoomInfo['capacity']) => void;
 updateOwner: (owner: RoomInfo['owner']) => void;
 updateHashtag: (hashtag: string) => void;

 update: (field: string, value: string) => void;
}

interface RoomsInfo {
  rooms: RoomInfo[];
  setRooms: (rooms: RoomsInfo['rooms']) => void;
}

const createRoomStore = (set) => ({
  roomId: '',
  roomName: '',
  description: '',
  participation: '',
  capacity: 1,
  owner: '',
  hashtag: '',
  updateRoomId: (roomId: string) => set({ roomId }),
  updateRoomName: (roomName: string) => set({ roomName }),
  updateDescription: (description: string) => set({ description }),
  updateParticipationn: (participation: string) => set({ participation }),
  updateCapacity: (capacity: number) => set({ capacity }),
  updateOwner: (owner: string) => set({ owner }),
  updateHashtag: (hashtag: string) => set({ hashtag }),

  update: (field, value) => set({ [field]: value }),
});

let roomInfoTemp;
let roomsInfoTemp;

const createRoomsStore = (set) => ({
  rooms: [] as RoomInfo[],
  setRooms: (rooms: RoomInfo[]) => set({ rooms }),
});

//devtools
if (import.meta.env.DEV) {
  roomInfoTemp = create<RoomInfo>()(devtools(createRoomStore, { name: 'roomInfo' }));
} else {
  roomInfoTemp = create<RoomInfo>()(createRoomStore);
}

roomsInfoTemp = create<RoomsInfo>()(createRoomsStore);

export const RoomInfo = roomInfoTemp;
export const RoomsInfo = roomsInfoTemp;