import { create } from 'zustand';

interface VideoCallState {
	audioEnabled: boolean;
	videoEnabled: boolean;
	setAudioEnabled: (enabled: boolean) => void;
	setVideoEnabled: (enabled: boolean) => void;
}

export const useVideoCallStore = create<VideoCallState>((set) => ({
	audioEnabled: true,
	videoEnabled: true,
	setAudioEnabled: (enabled) => set({ audioEnabled: enabled }),
	setVideoEnabled: (enabled) => set({ videoEnabled: enabled }),
}));
