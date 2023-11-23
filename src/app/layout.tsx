import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header';

const poppins = Poppins({
  weight: ["300", "400", '500', "600", "700", "800"],
  display: "swap",
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Supa Notes',
  description: 'Notes web app developed using NextJS.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}
