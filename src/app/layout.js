
import { Open_Sans } from 'next/font/google'
import './globals.css'

const open_sans = Open_Sans({ subsets: ['latin'] })

import { Providers } from './wrapper'
import NextAuthProvider from '@/context/nextauthProvider'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'

export const metadata = {
  title: "SysPMS",
  description: "Management Software",
};

export default function RootLayout({ children }) {
  
  return (

    <html lang="en">
      <body className={open_sans.className}>
        <Providers>
          <NextAuthProvider>
          {children}
          </NextAuthProvider>
        </Providers>
      </body>
    </html>


  )
}