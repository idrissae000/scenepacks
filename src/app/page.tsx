'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { packs } from '@/data/packs'
import PackCard from '@/components/PackCard'

const FEATURED_COUNT = 6

export default function HomePage() {
  const featured = packs.slice(0, FEATURED_COUNT)

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background layers */}
        <div className="absolute inset-0 bg-cinema-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(201,168,76,0.08),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_80%_60%,rgba(201,168,76,0.04),transparent)]" />
        {/* Cinematic scan lines */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)',
            backgroundSize: '100% 3px',
          }}
        />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-cinema-gold/20 bg-cinema-gold/5 px-4 py-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cinema-gold animate-pulse" />
            <span className="text-xs tracking-widest uppercase text-cinema-gold font-medium">
              Premium Scenepacks
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-6"
          >
            <span className="text-cinema-text">Idriss</span>
            <span className="text-gradient">.ae</span>
            <br />
            <span className="text-cinema-text">Scenepacks</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-xl text-cinema-muted max-w-xl mx-auto mb-10 leading-relaxed font-light tracking-wide"
          >
            The Number 1 Place for Aesthetic Scenepacks.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="https://discord.gg/MVA5ySY2"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-sm bg-cinema-gold px-8 py-3.5 text-sm font-bold text-cinema-black hover:bg-cinema-gold-light transition-all duration-200 shadow-lg shadow-cinema-gold/20"
            >
              <DiscordIcon />
              Join Discord
              <span className="group-hover:translate-x-0.5 transition-transform duration-200">→</span>
            </a>
            <Link
              href="/packs"
              className="flex items-center gap-2 rounded-sm border border-cinema-border bg-transparent px-8 py-3.5 text-sm font-medium text-cinema-text hover:border-cinema-gold/40 hover:bg-cinema-card transition-all duration-200"
            >
              Browse All Packs
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 flex items-center justify-center gap-10 sm:gap-16"
          >
            {[
              { value: `${packs.length}+`, label: 'Scenepacks' },
              { value: 'HD', label: 'Quality' },
              { value: '∞', label: 'Edits' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-black text-gradient">{stat.value}</div>
                <div className="text-xs text-cinema-muted tracking-widest uppercase mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cinema-black to-transparent" />
      </section>

      {/* Featured packs */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-xs tracking-widest uppercase text-cinema-gold mb-3 font-medium">Featured</p>
            <h2 className="text-3xl sm:text-4xl font-black text-cinema-text tracking-tight">
              Popular Packs
            </h2>
            <div className="mt-3 mx-auto w-12 h-px bg-cinema-gold/40" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((pack, i) => (
              <PackCard key={pack.id} pack={pack} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link
              href="/packs"
              className="inline-flex items-center gap-2 rounded-sm border border-cinema-border bg-cinema-card px-8 py-3 text-sm font-medium text-cinema-text hover:border-cinema-gold/40 hover:text-cinema-gold transition-all duration-200"
            >
              View All {packs.length} Packs
              <span>→</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}

function DiscordIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.04.033.05a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  )
}
