import type { Metadata } from 'next'
import './globals.scss'

import { Poppins, Barrio, Barriecito } from 'next/font/google'
import Container from '@/components/Containers/Container/Container'

export const poppins = Poppins({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-poppins',
})

export const barrio = Barrio({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-barrio',
})

export const barriecito = Barriecito({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-barriecito',
})

export const metadata: Metadata = {
  title: 'Pierogator',
  description: 'An application that generates dumplings using AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${barrio.variable} ${barriecito.variable}`}
      >
        <Container>{children}</Container>
      </body>
    </html>
  )
}
