import { userHooks } from '@entities/user'
import React from 'react'
import { useNavigate } from 'react-router-dom'

type GuestOnlyRouteProps = {
  children: React.ReactNode
}

export const GuestOnlyRoute = ({ children }: GuestOnlyRouteProps) => {
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

  if (isLoading || !!user) {
    return 'Loading...'
  }

  return children
}
