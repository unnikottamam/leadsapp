import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import QueryClientProvider from './QueryClientProvider';
import AuthProvider from './auth/Provider';
import DashboardPage from './dashboard/page';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Leads CRM',
  description: 'Created By CodeAwesome Team',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html data-theme="winter" suppressHydrationWarning={true} lang="en">
      <body className={`${inter.className} bg-white min-h-screen`}>
        <QueryClientProvider>
          <AuthProvider>
            <DashboardPage>{children}</DashboardPage>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}

export default RootLayout;