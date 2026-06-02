'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface Pack {
  id: number
  name: string
  slug: string
  description: string
  image: string
  discordLink: string
}

interface PackCardProps {
  pack: Pack
  index: number
}

export default function PackCard({ pack, index }: PackCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.05 }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col rounded-sm bg-cinema-card border border-cinema-border overflow-hidden card-glow hover:card-glow-hover transition-all duration-300"
    >
      {/* Image area */}
      <Link href={`/packs/${pack.slug}`} className="block relative aspect-[4/3] overflow-hidden bg-cinema-dark">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-4xl font-black text-cinema-border/30 tracking-widest uppercase select-none">
            {pack.name.split(' ')[0]}
          </div>
        </div>
        {pack.image && pack.image !== '/images/placeholder.jpg' && (
          <Image
            src={pack.image}
            alt={pack.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-card via-transparent to-transparent opacity-60" />
        {/* Cinematic letterbox lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cinema-gold/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cinema-gold/20 to-transparent" />
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <Link href={`/packs/${pack.slug}`} className="group/title">
          <h3 className="font-semibold text-base text-cinema-text group-hover/title:text-cinema-gold-light transition-colors duration-200 leading-snug tracking-wide">
            {pack.name}
          </h3>
        </Link>
        <p className="text-sm text-cinema-muted leading-relaxed flex-1 line-clamp-2">
          {pack.description}
        </p>
        <a
          href={pack.discordLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 flex items-center justify-center gap-2 w-full rounded-sm border border-cinema-gold/30 bg-cinema-gold/5 py-2.5 text-sm font-medium text-cinema-gold hover:bg-cinema-gold/15 hover:border-cinema-gold/60 transition-all duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.04.033.05a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
          </svg>
          Get Pack
        </a>
      </div>
    </motion.div>
  )
}
