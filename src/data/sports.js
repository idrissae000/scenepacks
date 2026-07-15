const IDRISS = '349045631656001537'

function char(name, description = '', image = '', dateAdded = '2026-01-01') {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  return {
    name, slug,
    image: image || '/images/placeholder.jpg',
    description: description || `[Placeholder] ${name} — swap this out with a real description.`,
    packLink: 'https://discord.com/invite/98C5YUeEz7',
    dateAdded,
  }
}

export const sports = [
  {
    id: 1,
    name: '2026 FIFA World Cup',
    slug: 'world-cup-2026',
    blurb: 'The greatest tournament on earth. 48 nations, one trophy, and moments that will never be forgotten.',
    theme: {
      bg: '#050a05', surface: '#0a1a0a',
      accent: '#0a3d0a', accentLight: '#155215', highlight: '#c9a84c',
      text: '#ffffff', muted: '#a0a090', border: '#1a3d1a',
      cardText: '#ffffff', cardMuted: '#c9a84c',
      headingFont: '"Oswald", system-ui, sans-serif',
      bodyFont: '"Oswald", system-ui, sans-serif',
      texClass: 'tex-world-cup', cardClass: 'card-world-cup',
      bgImage: '/backgrounds/world cup bg.webp',
      logo: '/logos/world cup logo.avif',
      atmosphere: [], loadFx: null, titleFx: null,
      label: 'USA · Canada · Mexico, 2026', tagline: 'One trophy. One dream.',
      cursor: 'default',
    },
    characters: [
      {
        ...char('Jude Bellingham', "England's golden boy. The most complete midfielder of his generation, built for the biggest stages.", '/characters/judeenglandpic.png', '2026-07-15'),
        pageImage: '/character-pages/judeenglandscp.png',
        packLink: 'https://discord.gg/MVA5ySY2',
        driveLink: 'https://drive.google.com/drive/folders/1ZQNnmiI5pO5dDeO0iiG1giBQ3zw3ENcO?usp=sharing',
        creatorId: IDRISS,
      },
      {
        ...char('Kylian Mbappé', 'The fastest man in football. A generational talent carrying the weight of a nation on his shoulders.', '/characters/mbappe_pic.png', '2026-07-15'),
        pageImage: '/character-pages/mbappe_scp.png',
        packLink: 'https://discord.gg/MVA5ySY2',
        driveLink: 'https://drive.google.com/drive/folders/1DdXgqzKDzEaVVVucLm-1vd2RFCsoNZ7C?usp=sharing',
        creatorId: IDRISS,
      },
    ],
  },
]
