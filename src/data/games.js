const DISCORD = 'https://discord.gg/MVA5ySY2'

function char(name, description = '', image = '') {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  return {
    name, slug,
    image: image || '/images/placeholder.jpg',
    description: description || `[Placeholder] ${name} — swap this out with a real description.`,
    packLink: DISCORD,
  }
}

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
      label: 'American Frontier, 1899', tagline: 'We are thieves in a world that don\'t want us no more.',
      cursor: 'default',
    },
    characters: [
      char('Arthur Morgan', "The Van der Linde gang's enforcer and moral center. A man wrestling with who he is and what he's done, one final ride at a time.", '/characters/arthur.png'),
      char('Dutch van der Linde', "Charismatic outlaw philosopher. His vision of freedom becomes a trap for everyone who believed in it.", '/characters/dutch.png'),
    ],
  },
]
