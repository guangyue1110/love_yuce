export const buttonVariants = {
  initial: { 
    scale: 1,
    backgroundColor: 'var(--primary)'
  },
  hover: { 
    scale: 1.05,
    backgroundColor: 'var(--primary-hover)',
    transition: { duration: 0.2 }
  },
  tap: { 
    scale: 0.95,
    transition: { duration: 0.1 }
  },
  disabled: {
    opacity: 0.7,
    scale: 1
  }
}

export const loadingVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  }
} 