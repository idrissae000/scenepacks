const DISCORD = 'https://discord.gg/MVA5ySY2'

function char(name, description = '') {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  return { name, slug, image: '/images/placeholder.jpg', description: description || `Placeholder description for ${name}. Swap this out with a real description.`, packLink: DISCORD }
}

export const movies = [
  {
    id: 1,
    name: 'Batman (2022)',
    slug: 'batman-2022',
    poster: '/images/placeholder.jpg',
    theme: {
      bg: '#03040a',
      surface: '#06080f',
      accent: '#1a2240',
      accentLight: '#242e55',
      gold: '#7888aa',
      text: '#c8ccd8',
      muted: '#484e62',
      border: '#0c1020',
      font: 'sans',
      mood: 'noir',
      gradient: 'linear-gradient(135deg, #03040a 0%, #060a18 50%, #03040a 100%)',
      heroOverlay: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(26,34,64,0.3) 0%, transparent 70%)',
      label: '🦇 Gotham City',
      tagline: 'I am vengeance.',
    },
    characters: [
      char('Batman', "Robert Pattinson's Dark Knight — brooding, obsessive, and violent. A detective first, superhero second. Gotham's shadow made flesh."),
    ],
  },
  {
    id: 2,
    name: 'Marvel Cinematic Universe',
    slug: 'mcu',
    poster: '/images/placeholder.jpg',
    theme: {
      bg: '#06040a',
      surface: '#0c080f',
      accent: '#6a1a1a',
      accentLight: '#8a2020',
      gold: '#c9a84c',
      text: '#e8e0e8',
      muted: '#6a5a6a',
      border: '#180c18',
      font: 'sans',
      mood: 'cosmic',
      gradient: 'linear-gradient(135deg, #06040a 0%, #100814 50%, #06040a 100%)',
      heroOverlay: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(106,26,26,0.2) 0%, transparent 70%)',
      label: '🌌 The Marvel Universe',
      tagline: 'Whatever it takes.',
    },
    characters: [
      char('Iron Man', "Tony Stark — genius, billionaire, playboy, philanthropist. The man who started it all, ended it all, and carried the weight of every universe in between."),
      char('Spider-Man', "Peter Parker in his Tom Holland era — young, brilliant, heartbroken, and spectacular. The MCU's most human superhero."),
      char('Thanos', "The Mad Titan. His philosophy of balance through genocide is cinema's greatest villain arc. He believed he was right. He might have been."),
    ],
  },
]
