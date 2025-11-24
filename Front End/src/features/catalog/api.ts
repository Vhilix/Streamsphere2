import { api } from '../../lib/api';
import type { CatalogResponse, TitleSummary } from '../../types/api';

export const catalogApi = {
  getCatalog: async (cursor?: string, pageSize = 20): Promise<CatalogResponse> => {
    const params = new URLSearchParams();
    if (cursor) params.append('cursor', cursor);
    params.append('pageSize', pageSize.toString());
    
    return api.get<CatalogResponse>(`/catalog?${params.toString()}`);
  },

  // Mock data for development
  getMockCatalog: (): CatalogResponse => {
    const mockTitles: TitleSummary[] = Array.from({ length: 20 }, (_, i) => ({
      id: `tt${1000 + i}`,
      name: `Title ${i + 1}`,
      posterUrl: `https://via.placeholder.com/300x450?text=Title+${i + 1}`,
      year: 2020 + (i % 5),
      genres: ['Action', 'Drama', 'Thriller'].slice(0, (i % 3) + 1),
    }));

    return {
      items: mockTitles,
      nextCursor: 'next_page_token',
    };
  },
};
