import './globals.css'

export const metadata = {
  title: 'Election Education Assistant — Learn How Elections Work',
  description: 'An interactive AI-powered assistant that teaches you the election process step-by-step through a guided chat experience.',
  keywords: 'election education, voting process, democracy, India elections, Lok Sabha',
  openGraph: {
    title: 'Election Education Assistant',
    description: 'Learn how elections work through an interactive WhatsApp-style chat interface.',
    type: 'website',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0b141a',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ height: '100dvh', overflow: 'hidden' }}>
        {children}
      </body>
    </html>
  )
}
