import { Variants } from 'framer-motion'

export const staggerChildren = (staggerTime = 0.1): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerTime
    }
  }
})

export const fadeInUp = (delay = 0): Variants => ({
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: "easeOut"
    }
  }
})

export const scaleIn = (delay = 0): Variants => ({
  hidden: { 
    opacity: 0, 
    scale: 0.9 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      delay,
      ease: "easeOut"
    }
  }
})

export const slideIn = (direction: 'left' | 'right' | 'up' | 'down', delay = 0): Variants => {
  const directions = {
    left: { x: -30, y: 0 },
    right: { x: 30, y: 0 },
    up: { x: 0, y: 30 },
    down: { x: 0, y: -30 }
  }

  return {
    hidden: { 
      opacity: 0,
      ...directions[direction]
    },
    visible: { 
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: "easeOut"
      }
    }
  }
} 