'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { movies } from '@/data/movies'
import BackgroundSlideshow from '@/components/BackgroundSlideshow'

export default function MoviesClient({ images }: { images: string[] }) {
  return (
    <>
      <BackgroundSlideshow images={images} />
      <div className="pt-28 pb-20 px-4">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="mob-label mb-3">The Collection</div>
            <h1 className="font-mobsters mb-4" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', color: '#d4c5a9' }}>
              Movies
            </h1>
            <div className="mob-divider max-w-[60px] mx-auto mb-4" />
            <p className="text-sm" style={{ color: '#847464' }}>
              {movies.length} franchises &middot; {movies.reduce((a: number, m: any) => a + m.characters.reduce((b: number, c: any) => b + (c.packs ? c.packs.length : 1), 0), 0)} scenepacks
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {movies.map((movie: any, i: number) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
              >
                <Link href={`/movies/${movie.slug}`} className="block">
                  <article className="card-clean rounded-md overflow-hidden h-full">
                    <div className="logo-placeholder aspect-video flex items-center justify-center overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={movie.theme.logo}
                        alt={movie.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const el = e.target as HTMLImageElement
                          el.style.display = 'none'
                        }}
                      />
                    </div>

                    <div className="p-5">
                      <h2 className="font-mobsters leading-tight" style={{ color: '#d4c5a9', fontSize: '1.45rem' }}>
                        {movie.name}
                      </h2>
                      <div className="mt-2 mb-3">
                        <span className="inline-block text-sm font-semibold" style={{
                          color: '#e8dcc4',
                          background: 'rgba(94,27,33,0.45)',
                          border: '1px solid #5e1b21',
                          borderRadius: '4px',
                          padding: '3px 10px',
                          letterSpacing: '0.03em',
                        }}>
                          {movie.characters.reduce((a: number, c: any) => a + (c.packs ? c.packs.length : 1), 0)} Scenepack{movie.characters.reduce((a: number, c: any) => a + (c.packs ? c.packs.length : 1), 0) !== 1 ? 's' : ''}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#9a8b76' }}>
                        {movie.blurb}
                      </p>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
