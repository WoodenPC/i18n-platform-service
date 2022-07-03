import React from 'react'
import { SignInForm } from '@features/auth/sing-in'
import { Panel, PanelHeader, SplitCol, SplitLayout } from '@vkontakte/vkui'

export const SignInPage = () => (
  <SplitLayout>
    <SplitCol>
      <Panel>
        <PanelHeader>Войти</PanelHeader>
        <div style={{ width: '400px', margin: 'auto' }}>
          <SignInForm />
        </div>
      </Panel>
    </SplitCol>
  </SplitLayout>
)
