'use client'

import { ThemeProvider } from 'next-themes'
import { FC, PropsWithChildren, useEffect, useState } from 'react'

const Providers: FC<PropsWithChildren> = ({ children }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}

export default Providers 