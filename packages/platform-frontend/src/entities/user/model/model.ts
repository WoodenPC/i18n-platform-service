import { createDomain } from 'effector';
import { UserStore } from './types';

const userDomain = createDomain('entities/user');

export const $user = userDomain.createStore<UserStore>({
    isLoading: false,
    user: null
});