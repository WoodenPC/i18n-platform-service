import { $user, fetchUserFx } from './model';

$user
  .on(fetchUserFx.pending, (state, isLoading) => ({
    ...state,
    isLoading,
  }))
  .on(fetchUserFx.doneData, (state, user) => ({
    isLoading: false,
    user,
  }));
