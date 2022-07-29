import { UserApi } from '@shared/api';
import { createDomain } from 'effector';
import { useStore } from 'effector-react';
import { UserStore } from './types';

const userDomain = createDomain('entities/user');

export const $user = userDomain.createStore<UserStore>({
  isLoading: false,
  user: {
    id: '321313',
    userEmail: 'test-user@mail.ru',
  },
});

export const fetchUserFx = userDomain.createEffect(async () => {
  const userApi = UserApi.getInstance();
  return {
    userName: 'test-user',
  }; // TODO
  // return await userApi.getUser();
});

export const hooks = {
  useUser: () => useStore($user),
};
