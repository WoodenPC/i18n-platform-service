import { User } from '@shared/api/types/user';

export type UserStore = {
  user: User | null;
  isLoading: boolean;
};
