'use client'

import { createContext, ReactNode, useContext } from 'react'
import { ProviderConfig } from './types'

const pageTransitionContext = createContext<ProviderConfig>({})

export const usePageTransitionConfig = () => useContext(pageTransitionContext)

interface Props {
  children: ReactNode
  config?: ProviderConfig
}

export const PageTransitionProvider = ({ children, config }: Props) => {
  return (
    <pageTransitionContext.Provider value={config ?? {}}>
      {children}
    </pageTransitionContext.Provider>
  )
}
