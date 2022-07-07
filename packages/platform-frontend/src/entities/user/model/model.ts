import { UserApi } from '@shared/api';
import { createDomain } from 'effector';
import { UserStore } from './types';

const userDomain = createDomain('entities/user');

export const $user = userDomain.createStore<UserStore>({
  isLoading: false,
  user: null,
});

export const fetchUserFx = userDomain.createEffect(async () => {
  const userApi = UserApi.getInstance();
  return await userApi.getUser();
});

$user
  .on(fetchUserFx.pending, (state, isLoading) => ({
    ...state,
    isLoading,
  }))
  .on(fetchUserFx.doneData, (state, user) => ({
    isLoading: false,
    user,
  }));
