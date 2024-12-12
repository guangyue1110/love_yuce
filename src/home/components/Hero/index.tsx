'use client'

import { FC } from 'react'
import Background from './Background'
import Slogan from './Slogan'

const Hero: FC = () => {
  return (
    <div className="relative">
      <Background />
      <div className="relative z-10">
        <Slogan />
      </div>
    </div>
  )
}

export default Hero 