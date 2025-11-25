import { api } from '../../lib/api';
import type { PlaybackResponse } from '../../types/api';

export const playbackApi = {
  startPlayback: async (titleId: string): Promise<PlaybackResponse> => {
    return api.post<PlaybackResponse>('/play/start', { titleId });
  },

  sendHeartbeat: async (
    titleId: string,
    positionSec: number,
    bitrateKbps?: number
  ): Promise<void> => {
    return api.post<void>('/play/heartbeat', {
      titleId,
      positionSec,
      bitrateKbps,
    });
  },

  // Mock data for development
  getMockPlayback: (titleId: string): PlaybackResponse => {
    return {
      titleId,
      hlsUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', // Demo HLS stream
    };
  },
};
