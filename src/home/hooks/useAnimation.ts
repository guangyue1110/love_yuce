import { useEffect, useState } from 'react'
import { useInView } from 'framer-motion'

export const useAnimationOnView = (ref: React.RefObject<HTMLElement>) => {
  const isInView = useInView(ref, { once: true })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [isInView, hasAnimated])

  return {
    shouldAnimate: isInView || hasAnimated,
    hasAnimated
  }
}

export const useDelayedAnimation = (delay: number = 0) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay * 1000)

    return () => clearTimeout(timer)
  }, [delay])

  return isVisible
} 