import React from 'react'

import { Header } from './Header'

export const Layout = ({ children }: React.PropsWithChildren) => (
  <>
    <Header/>
    <main>
      {children}
    </main>
  </>
)
