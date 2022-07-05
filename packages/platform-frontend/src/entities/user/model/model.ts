import { AuthApi } from '@shared/api';
import { createDomain } from 'effector';
import { UserStore } from './types';

const userDomain = createDomain('entities/user');

export const $user = userDomain.createStore<UserStore>({
  isLoading: false,
  user: null,
});

export const fetchUserFx = userDomain.createEffect(async () => {
  const authApi = AuthApi.getInstance();
  return await authApi.getUser();
});

$user.on(fetchUserFx.pending, (state, isLoading) => {
  return {
    ...state,
    isLoading
  }
}).on(fetchUserFx.doneData, (state, user) => {
  return {
    isLoading: false,
    user
  }
})

