export type AnimationType = 'fade' | 'slide-left' | 'slide-right' | 'scale'

export interface AnimationConfig {
  initial?: object
  animate?: object
  exit?: object
  duration?: number
}

export interface ProviderConfig {
  defaultAnimation?: AnimationType
  duration?: number
  routeAnimations?: Record<string, AnimationConfig>
  loader?: React.ReactNode
}
