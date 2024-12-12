import type { Metadata } from 'next'
import { GeistSans } from 'geist/font'
import './globals.css'
import Providers from './providers'

export const metadata: Metadata = {
  title: '遇见心动，相守一生',
  description: '找到与你灵魂共鸣的另一半',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${GeistSans.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
