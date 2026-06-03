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
    blurb: "Bruce Wayne becomes Gotham's vigilante detective, uncovering corruption tied to a serial killer called the Riddler.",
    theme: {
      bg: '#050508', surface: '#0a0a12',
      accent: '#1a1800', accentLight: '#f8d860', highlight: '#cc0000',
      text: '#c8ccd8', muted: '#5a6072', border: '#14141f',
      cardText: '#c8c0a0', cardMuted: '#8a8468',
      headingFont: '"Bebas Neue", system-ui, sans-serif',
      bodyFont: '"Bebas Neue", system-ui, sans-serif',
      texClass: 'tex-gotham', cardClass: 'card-batman',
      bgImage: '/backgrounds/batman.jpg',
      atmosphere: ['rain', 'batsignal'], loadFx: null, titleFx: null,
      label: 'Gotham City', tagline: 'I am vengeance.',
      cursor: 'default',
    },
    characters: [
      char('Batman', "Robert Pattinson's brooding, obsessive Dark Knight. A detective first, superhero second. Two years in, and Gotham is still losing."),
    ],
  },
  {
    id: 2,
    name: 'Marvel Cinematic Universe',
    slug: 'mcu',
    blurb: 'Earth\'s mightiest heroes face threats no single hero could withstand alone.',
    theme: {
      bg: '#020209', surface: '#040810',
      accent: '#1a1a5a', accentLight: '#40e8ff', highlight: '#f39c12',
      text: '#d8e0f0', muted: '#586080', border: '#0c0c20',
      cardText: '#c0c8e0', cardMuted: '#7a86a0',
      headingFont: '"Exo 2", system-ui, sans-serif',
      bodyFont: '"Exo 2", system-ui, sans-serif',
      texClass: 'tex-cosmos', cardClass: 'card-mcu',
      bgImage: '/backgrounds/mcu.jpg',
      atmosphere: ['stars'], loadFx: null, titleFx: null,
      label: 'The Marvel Universe', tagline: 'Whatever it takes.',
      cursor: 'default',
      charZones: {
        'iron-man':  { bg: '#140300', border: '#3d1a00', accent: '#2d1000', label: 'Iron Man',   gradient: 'linear-gradient(135deg, rgba(20,3,0,0.9) 0%, rgba(30,8,0,0.88) 100%)' },
        'spider-man':{ bg: '#050010', border: '#1a0a2d', accent: '#1a0a3d', label: 'Spider-Man', gradient: 'linear-gradient(135deg, rgba(10,5,15,0.9) 0%, rgba(5,0,20,0.88) 100%)' },
        'thanos':    { bg: '#0a0018', border: '#2d0a3d', accent: '#1a0530', label: 'Thanos',     gradient: 'linear-gradient(135deg, rgba(15,0,25,0.9) 0%, rgba(5,0,15,0.88) 100%)' },
      },
    },
    characters: [
      char('Iron Man', "Tony Stark — genius, billionaire, playboy, philanthropist. The man who started it all and ended it all. I love you 3000."),
      char('Spider-Man', "Peter Parker in the Tom Holland era. Young, brilliant, heartbroken, spectacular. The MCU's most human hero."),
      char('Thanos', "The Mad Titan. His conviction that he's right is what makes him terrifying. Cinema's greatest villain argument."),
    ],
  },
]
