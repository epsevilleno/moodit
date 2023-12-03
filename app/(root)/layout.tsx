import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import '../globals.css'

import Topbar from '@/components/shared/Topbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mood.it',
  description: 'A WebApp for Soft Eng'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        <Topbar />
        <main className="flex flex-row">

          <section className="main-container">
            <div className="w-full max-w-4xl">
              {children}
            </div>
          </section>
        </main>
      </body>
    </html>
    </ClerkProvider>
  )
}
