import { User } from '@shared/api/types/user';
import { createDomain } from 'effector';

const userDomain = createDomain('entities/user');

export const $user = userDomain.createStore<User | null>(null);