export const heroVariants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

export const sloganVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
}

export const backgroundVariants = {
  hidden: { 
    opacity: 0 
  },
  visible: { 
    opacity: 0.08,
    transition: {
      duration: 1,
      ease: "easeInOut"
    }
  }
} 