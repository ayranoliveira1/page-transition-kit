'use client'

import { Fragment, ReactNode, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { AnimationType } from './types'
import { usePathname } from 'next/navigation'
import { usePageTransitionConfig } from './page-transition-provider'

interface Props {
  children: ReactNode
}

const animationPresets: Record<AnimationType, any> = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  'slide-left': {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 },
  },
  'slide-right': {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 100, opacity: 0 },
  },
  scale: {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.95, opacity: 0 },
  },
}

export const PageTransitionLayout = ({ children }: Props) => {
  const pathName = usePathname()
  const [displayChildren, setDisplayChildren] = useState(children)
  const [loading, setLoading] = useState(false)

  const config = usePageTransitionConfig()

  useEffect(() => {
    if (config.loader) setLoading(true)
    setDisplayChildren(children)
    setLoading(false)
  }, [pathName, children, config.loader])

  const routeAnimation = config.routeAnimations?.[pathName]
  const animation =
    routeAnimation || animationPresets[config.defaultAnimation ?? 'fade']
  const duration = routeAnimation?.duration

  return (
    <Fragment>
      {loading && config.loader}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathName}
          initial={animation.initial}
          animate={animation.animate}
          exit={animation.exit}
          transition={{ duration }}
        >
          {displayChildren}
        </motion.div>
      </AnimatePresence>
    </Fragment>
  )
}
