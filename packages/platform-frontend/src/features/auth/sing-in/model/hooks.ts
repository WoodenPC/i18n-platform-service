import { useEvent, useStore } from 'effector-react'
import { $isLoading, signIn } from './model'

export const useSignIn = () => {
  const isLoading = useStore($isLoading)
  const signInFn = useEvent(signIn)

  return { isLoading, signInFn }
}
