const DISCORD = 'https://discord.gg/MVA5ySY2'

function char(name, description = '') {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  return {
    name, slug,
    image: '/images/placeholder.jpg', // TODO: replace with real image path
    description: description || `[Placeholder] ${name} — swap this description out with the real thing.`,
    packLink: DISCORD,
  }
}

export const movies = [
  {
    id: 1,
    name: 'Batman (2022)',
    slug: 'batman-2022',
    poster: '/images/placeholder.jpg', // TODO: replace
    theme: {
      bg: '#03040c',
      surface: '#06080e',
      accent: '#f0c040',
      accentLight: '#f8d860',
      gold: '#f0c040',
      text: '#a8b0c0',
      muted: '#484e60',
      border: '#0c1020',
      headingFont: '"Bebas Neue", system-ui, sans-serif',
      bodyFont: '"Bebas Neue", system-ui, sans-serif',
      patternClass: 'pattern-batman',
      animClass: '',
      cardClass: 'card-batman',
      emojis: ['🦇', '🌧️', '🔦', '🕵️'],
      mood: 'noir',
      gradient: 'linear-gradient(160deg, #03040c 0%, #04060f 50%, #020308 100%)',
      heroOverlay: 'radial-gradient(ellipse 80% 55% at 50% -5%, rgba(26,34,64,0.35) 0%, transparent 65%)',
      label: '🦇 Gotham City',
      tagline: 'I am vengeance.',
    },
    characters: [
      char('Batman', "Robert Pattinson's Dark Knight — brooding, obsessive, and frightening. A detective first, superhero second. Two years into his war on crime, and Gotham is still losing."),
    ],
  },
  {
    id: 2,
    name: 'Marvel Cinematic Universe',
    slug: 'mcu',
    poster: '/images/placeholder.jpg',
    theme: {
      bg: '#020209',
      surface: '#040410',
      accent: '#00d4ff',
      accentLight: '#40e8ff',
      gold: '#c9a227',
      text: '#d8e0f0',
      muted: '#586080',
      border: '#0c0c20',
      headingFont: '"Exo 2", system-ui, sans-serif',
      bodyFont: '"Exo 2", system-ui, sans-serif',
      patternClass: 'pattern-mcu',
      animClass: 'anim-star-drift',
      cardClass: 'card-mcu',
      emojis: ['⚡', '🌌', '🦾', '🕷️', '💜'],
      mood: 'cosmic',
      gradient: 'linear-gradient(160deg, #020209 0%, #04041a 50%, #020209 100%)',
      heroOverlay: 'radial-gradient(ellipse 80% 55% at 50% -5%, rgba(0,212,255,0.12) 0%, transparent 65%)',
      label: '🌌 The Marvel Universe',
      tagline: 'Whatever it takes.',
    },
    characters: [
      char('Iron Man', "Tony Stark — genius, billionaire, playboy, philanthropist. The man who started it all, ended it all, and carried the weight of every universe in between. I love you 3000."),
      char('Spider-Man', "Peter Parker in the Tom Holland era. Young, brilliant, heartbroken, and spectacular. The MCU's most human superhero — the one who had the most to lose."),
      char('Thanos', "The Mad Titan. His philosophy of balance through annihilation is cinema's greatest villain conviction. He believed he was right. The scariest part? He might have been."),
    ],
  },
]
