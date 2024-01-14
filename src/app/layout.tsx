import type { Metadata } from 'next'
import './globals.css'
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: 'Webhooks Portal',
  description: 'Portal to manage webhooks.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    return (
      <html lang="en">
          {children}
      </html>
  )
}
