import { AuthApi } from '@shared/api'
import { createEffect, createEvent, createStore, forward } from 'effector'
import { SignUpStatus } from './types'

export const signUp = createEvent<{ userEmail: string; userPassword: string }>()
export const resetSignUpStatus = createEvent()

export const signUpFx = createEffect(
  async ({
    userEmail,
    userPassword,
  }: {
    userEmail: string
    userPassword: string
  }) => {
    const authApi = AuthApi.getInstance()
    return await authApi.signUp({ userEmail, userPassword })
  }
)

export const $signUpStatus = createStore<SignUpStatus>('idle')
export const $isLoading = signUpFx.pending

$signUpStatus
  .on(signUpFx.done, () => 'success')
  .on(signUpFx.fail, () => 'fail')
  .on(resetSignUpStatus, () => 'idle')

forward({
  from: signUp,
  to: signUpFx,
})
