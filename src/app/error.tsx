'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface ErrorPageProps {
  error: Error
  reset: () => void
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: '#0d0a07' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg"
      >
        <div className="mob-label mb-4">Error</div>

        <h1
          className="font-mobsters mb-4"
          style={{
            fontSize: 'clamp(2rem, 7vw, 4rem)',
            color: '#d4c5a9',
          }}
        >
          Something Went Wrong
        </h1>

        <div className="mob-divider max-w-[60px] mx-auto mb-6" />

        <p
          className="text-sm leading-relaxed mb-10 font-fell italic"
          style={{ color: '#847464' }}
        >
          The family ran into a problem. It happens. Try again or head back home
          — we&apos;ll pretend this never happened.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-8 py-3 rounded-sm text-sm font-bold tracking-wider uppercase transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, #3d1419, #5e1b21)',
              color: '#d4c5a9',
              border: '1px solid rgba(94,27,33,0.4)',
              fontFamily: 'Inter, system-ui, sans-serif',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = 'rgba(229,92,53,0.5)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = 'rgba(94,27,33,0.4)')
            }
          >
            Try Again
          </button>

          <Link
            href="/"
            className="px-8 py-3 rounded-sm text-sm font-bold tracking-wider uppercase transition-all duration-200 inline-block"
            style={{
              background: 'transparent',
              color: '#847464',
              border: '1px solid rgba(94,27,33,0.25)',
              fontFamily: 'Inter, system-ui, sans-serif',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = '#d4c5a9')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = '#847464')
            }
          >
            ← Back Home
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
