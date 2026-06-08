const DISCORD = 'https://discord.gg/MVA5ySY2'

export const games = [
  {
    id: 1,
    name: 'Red Dead Redemption 2',
    slug: 'rdr2',
    blurb: "An epic tale of life in America's unforgiving heartland. The end of the outlaw era.",
    theme: {
      bg: '#0f0905', surface: '#1a0f06',
      accent: '#8b3a0f', accentLight: '#b04f18', highlight: '#c9a84c',
      text: '#d4c5a9', muted: '#8a7560', border: '#3d1f0a',
      cardText: '#d4c5a9', cardMuted: '#9a8570',
      headingFont: '"Playfair Display", Georgia, serif',
      bodyFont: '"IM Fell English", Georgia, serif',
      texClass: '', cardClass: 'card-rdr2',
      bgImage: '/backgrounds/rdr2.jpg',
      logo: '/logos/rdr2logo.png',
      atmosphere: [], loadFx: null, titleFx: null,
      label: 'American Frontier, 1899', tagline: "We are thieves in a world that don't want us no more.",
      cursor: 'default',
    },
    characters: [
      {
        id: 'arthur-morgan',
        name: 'Arthur Morgan',
        slug: 'arthur-morgan',
        image: '/characters/arthur.png',
        description: "The soul of the Van der Linde gang. Honor, loyalty, and a world that keeps asking too much.",
        packLink: DISCORD,
        packs: [
          { label: 'Aesthetic Pack', image: '/character-pages/arthuraesthetic.png', packLink: DISCORD },
          { label: 'Sad Pack',       image: '/character-pages/arthursad.png',       packLink: DISCORD },
        ],
      },
      {
        id: 'micah-bell',
        name: 'Micah Bell',
        slug: 'micah-bell',
        image: '/characters/micahh.png',
        pageImage: '/character-pages/micahscp.png',
        description: "The rot inside the gang. Every scene he's in makes your skin crawl.",
        packLink: DISCORD,
      },
    ],
  },
]
