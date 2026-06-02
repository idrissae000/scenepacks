const DISCORD = 'https://discord.gg/MVA5ySY2'

function char(name, description = '') {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  return {
    name, slug,
    image: '/images/placeholder.jpg', // TODO: replace
    description: description || `[Placeholder] ${name} — swap this out with a real description.`,
    packLink: DISCORD,
  }
}

export const movies = [
  {
    id: 1,
    name: 'Batman (2022)',
    slug: 'batman-2022',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/The_Batman_2022_film_logo.png/1280px-The_Batman_2022_film_logo.png',
    theme: {
      bg: '#050508',
      surface: '#06080e',
      accent: '#f0c040',
      accentLight: '#f8d860',
      highlight: '#cc0000',
      text: '#a8b0c0',
      muted: '#484e60',
      border: '#0c1020',
      headingFont: '"Bebas Neue", system-ui, sans-serif',
      bodyFont: '"Bebas Neue", system-ui, sans-serif',
      patternClass: 'pattern-gotham-rain',
      cardClass: 'card-batman',
      emojis: ['🦇', '🌧️', '🔦', '🕵️', '❓'],
      gradient: 'linear-gradient(160deg, #050508 0%, #04060f 50%, #020308 100%)',
      heroOverlay: 'radial-gradient(ellipse 80% 55% at 50% -5%, rgba(26,34,64,0.35) 0%, transparent 65%)',
      label: '🦇 Gotham City',
      tagline: 'I am vengeance.',
      cursor: 'default',
      specialFx: 'bat-signal',
    },
    characters: [
      char('Batman', "Robert Pattinson's brooding, obsessive Dark Knight. A detective first, superhero second. Two years in, and Gotham is still losing."),
    ],
  },
  {
    id: 2,
    name: 'Marvel Cinematic Universe',
    slug: 'mcu',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Marvel_Logo.svg/1280px-Marvel_Logo.svg.png',
    theme: {
      bg: '#020209',
      surface: '#040414',
      accent: '#00d4ff',
      accentLight: '#40e8ff',
      highlight: '#c0392b',
      text: '#d8e0f0',
      muted: '#586080',
      border: '#0c0c20',
      headingFont: '"Exo 2", system-ui, sans-serif',
      bodyFont: '"Exo 2", system-ui, sans-serif',
      patternClass: 'pattern-stars',
      cardClass: 'card-mcu',
      emojis: ['⚡', '🌌', '🦾', '🕷️', '💜', '🔴'],
      gradient: 'linear-gradient(160deg, #020209 0%, #04041a 50%, #020209 100%)',
      heroOverlay: 'radial-gradient(ellipse 80% 55% at 50% -5%, rgba(0,212,255,0.12) 0%, transparent 65%)',
      label: '🌌 The Marvel Universe',
      tagline: 'Whatever it takes.',
      cursor: 'default',
      specialFx: 'stars',
      charZones: {
        'iron-man':  { bg: '#1a0000', border: '#c0392b', accent: '#f39c12', label: '🦾 Iron Man', gradient: 'linear-gradient(135deg, #1a0000 0%, #2a0a00 100%)' },
        'spider-man':{ bg: '#000a1a', border: '#e74c3c', accent: '#3498db', label: '🕷️ Spider-Man', gradient: 'linear-gradient(135deg, #000a1a 0%, #00051a 100%)' },
        'thanos':    { bg: '#0a0010', border: '#6a0dad', accent: '#9b59b6', label: '💜 Thanos', gradient: 'linear-gradient(135deg, #0a0010 0%, #050008 100%)' },
      },
    },
    characters: [
      char('Iron Man', "Tony Stark — genius, billionaire, playboy, philanthropist. The man who started it all and ended it all. I love you 3000."),
      char('Spider-Man', "Peter Parker in the Tom Holland era. Young, brilliant, heartbroken, spectacular. The MCU's most human hero."),
      char('Thanos', "The Mad Titan. His conviction that he's right is what makes him terrifying. Cinema's greatest villain argument."),
    ],
  },
]
