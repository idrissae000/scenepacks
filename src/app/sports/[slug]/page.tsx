import { sports } from '@/data/sports'
import ShowHero from '@/components/ShowHero'
import CharacterGrid from '@/components/CharacterGrid'
import PageAtmosphere from '@/components/PageAtmosphere'
import PageViewTracker from '@/components/PageViewTracker'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return sports.map((s: any) => ({ slug: s.slug }))
}

export default function SportPage({ params }: { params: { slug: string } }) {
  const sport = (sports as any[]).find(s => s.slug === params.slug)
  if (!sport) notFound()

  return (
    <>
      {sport.theme.bgImage && <link rel="preload" as="image" href={sport.theme.bgImage} />}
      <div className="relative" style={{ minHeight: '100vh' }}>
        <PageAtmosphere theme={sport.theme} />
        <PageViewTracker slug={sport.slug} type="sport" label={sport.name} />
        <div className="relative" style={{ zIndex: 1 }}>
          <ShowHero show={sport} type="show" />
          <CharacterGrid show={sport} baseHref={`/sports/${sport.slug}`} />
        </div>
      </div>
    </>
  )
}
