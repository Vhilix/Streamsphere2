import { api } from '../../lib/api';
import type { TitleDetails } from '../../types/api';

export const titleApi = {
  getTitle: async (id: string): Promise<TitleDetails> => {
    return api.get<TitleDetails>(`/titles/${id}`);
  },

  // Mock data for development
  getMockTitle: (id: string): TitleDetails => {
    return {
      id,
      name: `Movie Title ${id}`,
      synopsis: 'An epic tale of adventure, drama, and excitement. Follow our heroes as they embark on a journey that will change their lives forever. With stunning visuals and a gripping storyline, this is a must-watch experience.',
      images: {
        poster: 'https://via.placeholder.com/300x450?text=Poster',
        backdrop: 'https://via.placeholder.com/1920x1080?text=Backdrop',
      },
      streams: [
        { profile: '1080p', drm: 'widevine' },
        { profile: '720p', drm: 'widevine' },
      ],
      similar: ['tt1001', 'tt1002', 'tt1003', 'tt1004'],
      year: 2023,
      genres: ['Action', 'Adventure', 'Drama'],
    };
  },
};
