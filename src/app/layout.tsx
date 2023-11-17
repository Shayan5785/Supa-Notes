import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import LogoutButton from "@/components/LogoutButton";

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
        <nav>
          <h1>Supa Notes</h1>
          <Link href="/">Home</Link>
          <Link href="/create">Create New Note</Link>
          <Link href="/signup">Sign up</Link>
          <Link href="/login">Log in</Link>
          <LogoutButton />
        </nav>
        {children}
      </body>
    </html>
  )
}
