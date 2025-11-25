import { api } from '../../lib/api';
import type { RecommendationsResponse } from '../../types/api';

export const recsApi = {
  getHomeRecs: async (): Promise<RecommendationsResponse> => {
    return api.get<RecommendationsResponse>('/recs/home');
  },

  getTitleRecs: async (titleId: string): Promise<RecommendationsResponse> => {
    return api.get<RecommendationsResponse>(`/recs/for/${titleId}`);
  },

  // Mock data for development
  getMockRecs: (): RecommendationsResponse => {
    return {
      items: Array.from({ length: 10 }, (_, i) => ({
        titleId: `tt${2000 + i}`,
        score: 0.9 - i * 0.05,
      })),
    };
  },
};
