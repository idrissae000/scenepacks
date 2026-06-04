import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'

export const metadata: Metadata = {
  title: 'Idriss.ae Scenepacks — Free Aesthetic Scenepacks',
  description: 'Free high quality scenepacks for aesthetic edits. Sopranos, Breaking Bad, Game of Thrones, Batman and more. 1080p 24fps cinematic clips. Credit: @idriss.ae',
  keywords: 'scenepacks, free scenepacks, aesthetic edits, sopranos scenepack, breaking bad scenepack, game of thrones scenepack, batman scenepack, cinematic clips, 1080p scenepacks, better call saul scenepack, prison break scenepack',
  openGraph: {
    title: 'Idriss.ae Scenepacks — Free Aesthetic Scenepacks',
    description: 'Free high quality scenepacks for aesthetic edits. 1080p 24fps cinematic clips.',
    url: 'https://idrissscenes.com',
    siteName: 'Idriss.ae Scenepacks',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Idriss.ae Scenepacks',
    description: 'Free aesthetic scenepacks. Sopranos, Breaking Bad, GOT and more.',
    creator: '@idriss.ae',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Idriss.ae Scenepacks',
              url: 'https://idrissscenes.com',
              description: 'Free aesthetic scenepacks for video editors. Sopranos, Breaking Bad, Game of Thrones and more.',
              author: {
                '@type': 'Person',
                name: 'Idriss.ae',
                url: 'https://www.tiktok.com/@idriss.ae',
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-mob-black text-mob-text antialiased">
        <ScrollToTop />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
