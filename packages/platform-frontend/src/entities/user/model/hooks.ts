import { useStore } from 'effector-react'
import { $user } from './model'

export const useUser = () => useStore($user)
