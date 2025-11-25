import { api } from '../../lib/api';
import type { User } from '../../types/api';

export const accountApi = {
  getProfile: async (): Promise<User> => {
    return api.get<User>('/me');
  },

  updateProfile: async (data: { name?: string; password?: string }): Promise<User> => {
    return api.patch<User>('/me', data);
  },
};
