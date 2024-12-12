'use client'

import { FC } from 'react'

const Background: FC = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-white dark:bg-black" />
    </div>
  )
}

export default Background