import { userHooks } from '@entities/user'
import React from 'react'
import { useNavigate } from 'react-router-dom'

type AuthOnlyRouteProps = {
  children: React.ReactNode
}

export const AuthOnlyRoute = ({ children }: AuthOnlyRouteProps) => {
  const { user, isLoading } = userHooks.useUser()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (!isLoading) {
      if (user) {
        navigate('/', {
          replace: true,
        })
      } else {
        navigate('/signIn', {
          replace: true,
        })
      }
    }
  }, [user, isLoading])

  if (isLoading) {
    return 'Loading...'
  }

  if (user) {
    return children
  }

  return null
}
