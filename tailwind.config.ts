import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'float-up': 'float-up 6s ease-in-out forwards',
        'gradient': 'gradient 8s linear infinite',
      },
      keyframes: {
        'float-up': {
          '0%': { 
            transform: 'translateY(100vh) scale(0)',
            opacity: '0'
          },
          '50%': { 
            opacity: '0.5'
          },
          '100%': { 
            transform: 'translateY(-100vh) scale(1)',
            opacity: '0'
          }
        },
        'gradient': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        }
      }
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
}

export default config
