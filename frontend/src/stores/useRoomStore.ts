import create from 'zustand';

const useRoomStore = create((set) => ({
  rooms: [],
  addRoom: (room) => set((state) => ({ rooms: [...state.rooms, room] })),
}));

export default useRoomStore;