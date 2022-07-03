import { SplitLayout } from '@vkontakte/vkui'
import React from 'react'

type AppLayoutProps = {
  children: React.ReactNode
}

export const AppLayout = ({ children }: AppLayoutProps) => (
  <SplitLayout>{children}</SplitLayout>
)
