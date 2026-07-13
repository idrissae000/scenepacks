const DISCORD = 'https://discord.com/invite/98C5YUeEz7'
const IDRISS = '349045631656001537'

function char(name, description = '', image = '', dateAdded = '2026-01-01') {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  return {
    name, slug,
    image: image || '/images/placeholder.jpg',
    description: description || `[Placeholder] ${name} — swap this out with a real description.`,
    packLink: DISCORD,
    dateAdded,
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
      logo: '/logos/batmanlogo.jpg',
      atmosphere: ['rain', 'batsignal'], loadFx: null, titleFx: null,
      label: 'Gotham City', tagline: 'I am vengeance.',
      cursor: 'default',
    },
    characters: [
      { ...char('Batman', "Robert Pattinson's brooding, obsessive Dark Knight. A detective first, superhero second. Two years in, and Gotham is still losing.", '/characters/bats.png', '2025-06-21'), driveLink: 'https://drive.google.com/drive/folders/19x64JP7zo-ggbJmEtBTo1GMSao-nNORI', creatorId: IDRISS },
    ],
  },
  {
    id: 2,
    name: 'Marvel Cinematic Universe',
    slug: 'mcu',
    blurb: "Earth's mightiest heroes face threats no single hero could withstand alone.",
    theme: {
      bg: '#020209', surface: '#040810',
      accent: '#1a1a5a', accentLight: '#40e8ff', highlight: '#f39c12',
      text: '#d8e0f0', muted: '#586080', border: '#0c0c20',
      cardText: '#c0c8e0', cardMuted: '#7a86a0',
      headingFont: '"Exo 2", system-ui, sans-serif',
      bodyFont: '"Exo 2", system-ui, sans-serif',
      texClass: 'tex-cosmos', cardClass: 'card-mcu',
      bgImage: '/backgrounds/mcu.jpg',
      logo: '/logos/mculogo.jpg',
      atmosphere: ['stars'], loadFx: null, titleFx: null,
      label: 'The Marvel Universe', tagline: 'Whatever it takes.',
      cursor: 'default',
      charZones: {
        'iron-man':        { bg: '#140300', border: '#3d1a00', accent: '#2d1000', label: 'Iron Man',        gradient: 'linear-gradient(135deg, rgba(20,3,0,0.9) 0%, rgba(30,8,0,0.88) 100%)' },
        'spider-man':      { bg: '#050010', border: '#1a0a2d', accent: '#1a0a3d', label: 'Spider-Man',      gradient: 'linear-gradient(135deg, rgba(10,5,15,0.9) 0%, rgba(5,0,20,0.88) 100%)' },
        'thanos':          { bg: '#0a0018', border: '#2d0a3d', accent: '#1a0530', label: 'Thanos',          gradient: 'linear-gradient(135deg, rgba(15,0,25,0.9) 0%, rgba(5,0,15,0.88) 100%)' },
        'captain-america': { bg: '#000a1a', border: '#0a2040', accent: '#0a1a30', label: 'Captain America', gradient: 'linear-gradient(135deg, rgba(0,10,26,0.9) 0%, rgba(0,5,18,0.88) 100%)' },
      },
    },
    characters: [
      { ...char('Iron Man', "Tony Stark — genius, billionaire, playboy, philanthropist. The man who started it all and ended it all. I love you 3000.", '/characters/ironman.png', '2025-09-22'), driveLink: 'https://drive.google.com/drive/folders/1f7uprSJp2qnsBJY-3Vw_qQzLI4wh2fI0', creatorId: IDRISS },
      { ...char('Spider-Man', "Peter Parker in the Tom Holland era. Young, brilliant, heartbroken, spectacular. The MCU's most human hero.", '/characters/spiderman.png', '2025-06-23'), driveLink: 'https://drive.google.com/drive/folders/1eUrCE-l-EUNHnF7Ih0N064rSM6WmVhvv', creatorId: IDRISS },
      { ...char('Thanos', "The Mad Titan. His conviction that he's right is what makes him terrifying. Cinema's greatest villain argument.", '/characters/thanos.png', '2025-07-09'), driveLink: 'https://drive.google.com/drive/folders/1RD01wP8AElSRVpcPhO32qTFq2k1xJyzc', creatorId: IDRISS },
      { ...char('Captain America', "The first Avenger. A man out of time who never stopped believing in something worth fighting for.", '/characters/captainamericapic.png', '2026-06-12'), pageImage: '/character-pages/captainamericascp.png', packLink: DISCORD, driveLink: 'https://drive.google.com/drive/folders/1MchpUHcDLJ9qaIBhljR2uYBftQWENtI6', creatorId: IDRISS },
    ],
  },
]
