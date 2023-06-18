import React, { ReactNode } from 'react'

import { Header } from './Header'

export const Layout = ({ children }: { children: ReactNode }) => (
  <>
    <Header/>
    <main>
      {children}
    </main>
  </>
)
