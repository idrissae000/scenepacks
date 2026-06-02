import { packs } from '@/data/packs'
import PackGrid from '@/components/PackGrid'

export const metadata = {
  title: 'All Packs — Idriss.ae Scenepacks',
  description: 'Browse all available scenepacks. Search by character name.',
}

export default function PacksPage() {
  return (
    <div className="pt-28 pb-20 px-4">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs tracking-widest uppercase text-cinema-gold mb-3 font-medium">Library</p>
          <h1 className="text-4xl sm:text-5xl font-black text-cinema-text tracking-tight">
            All Scenepacks
          </h1>
          <p className="mt-4 text-cinema-muted text-sm tracking-wide">
            {packs.length} packs available — search to find your character
          </p>
          <div className="mt-4 mx-auto w-12 h-px bg-cinema-gold/40" />
        </div>

        <PackGrid packs={packs} showSearch />
      </div>
    </div>
  )
}
