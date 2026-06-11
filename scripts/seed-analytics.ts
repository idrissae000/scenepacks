import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load .env.local manually
const envPath = path.resolve(__dirname, '../.env.local')
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^([^#=]+)=(.*)$/)
    if (m) process.env[m[1].trim()] = m[2].trim()
  }
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const entries: { slug: string; label: string; views: number; downloads: number }[] = [
  // The Sopranos
  { slug: 'the-sopranos__tony-soprano',            label: 'Tony Soprano',               views: 523, downloads: 178 },
  { slug: 'the-sopranos__christopher-moltisanti',  label: 'Christopher Moltisanti',     views: 218, downloads: 61  },
  { slug: 'the-sopranos__paulie-gualtieri',        label: 'Paulie Gualtieri',           views: 42,  downloads: 12  },
  { slug: 'the-sopranos__silvio-dante',            label: 'Silvio Dante',               views: 54,  downloads: 18  },
  { slug: 'the-sopranos__ralph-cifaretto',         label: 'Ralph Cifaretto',            views: 23,  downloads: 8   },
  { slug: 'the-sopranos__tony-blundetto',          label: 'Tony Blundetto',             views: 96,  downloads: 29  },

  // Breaking Bad
  { slug: 'breaking-bad__walter-white',            label: 'Walter White',               views: 314, downloads: 89  },
  { slug: 'breaking-bad__jesse-pinkman',           label: 'Jesse Pinkman',              views: 83,  downloads: 34  },

  // Better Call Saul
  { slug: 'better-call-saul__jimmy-mcgill-saul-goodman', label: 'Jimmy McGill / Saul Goodman', views: 43, downloads: 9 },
  { slug: 'better-call-saul__kim-wexler',          label: 'Kim Wexler',                 views: 22,  downloads: 6   },
  { slug: 'better-call-saul__lalo-salamanca',      label: 'Lalo Salamanca',             views: 210, downloads: 107 },

  // Game of Thrones
  { slug: 'game-of-thrones__jon-snow',             label: 'Jon Snow',                   views: 312, downloads: 131 },
  { slug: 'game-of-thrones__daenerys-targaryen',   label: 'Daenerys Targaryen',         views: 122, downloads: 47  },
  { slug: 'game-of-thrones__arya-stark',           label: 'Arya Stark',                 views: 86,  downloads: 30  },
  { slug: 'game-of-thrones__jaime-lannister',      label: 'Jaime Lannister',            views: 71,  downloads: 22  },
  { slug: 'game-of-thrones__ned-stark',            label: 'Ned Stark',                  views: 68,  downloads: 19  },
  { slug: 'game-of-thrones__robb-stark',           label: 'Robb Stark',                 views: 74,  downloads: 20  },
  { slug: 'game-of-thrones__oberyn-martell',       label: 'Oberyn Martell',             views: 36,  downloads: 10  },

  // Prison Break
  { slug: 'prison-break__alexander-mahone',        label: 'Alexander Mahone',           views: 41,  downloads: 13  },
  { slug: 'prison-break__paul-kellerman',          label: 'Paul Kellerman',             views: 24,  downloads: 7   },

  // Sons of Anarchy
  { slug: 'sons-of-anarchy__jax-teller',           label: 'Jax Teller',                 views: 32,  downloads: 8   },

  // You
  { slug: 'you__joe-goldberg',                     label: 'Joe Goldberg',               views: 110, downloads: 31  },

  // Barry
  { slug: 'barry__barry-berkman',                  label: 'Barry Berkman',              views: 27,  downloads: 6   },

  // The Bear
  { slug: 'the-bear__carmy-berzatto',              label: 'Carmy Berzatto',             views: 24,  downloads: 6   },

  // The Boys
  { slug: 'the-boys__homelander',                  label: 'Homelander',                 views: 12,  downloads: 2   },

  // Batman 2022
  { slug: 'batman-2022__batman',                   label: 'Batman',                     views: 35,  downloads: 11  },

  // MCU
  { slug: 'mcu__iron-man',                         label: 'Iron Man',                   views: 317, downloads: 97  },
  { slug: 'mcu__spider-man',                       label: 'Spider-Man',                 views: 87,  downloads: 24  },
  { slug: 'mcu__thanos',                           label: 'Thanos',                     views: 42,  downloads: 16  },

  // Batman Arkham
  { slug: 'batman-arkham__batman-arkham',          label: 'Batman — Arkham Series',     views: 22,  downloads: 8   },
  { slug: 'batman-arkham__the-joker',              label: 'The Joker (Arkham)',         views: 16,  downloads: 5   },

  // Batman BTAS
  { slug: 'batman-btas__batman-btas',              label: 'Batman — BTAS',              views: 14,  downloads: 3   },
  { slug: 'batman-btas__the-joker',                label: 'The Joker (BTAS)',           views: 11,  downloads: 3   },

  // RDR2
  { slug: 'rdr2__arthur-morgan',                   label: 'Arthur Morgan',              views: 34,  downloads: 9   },
  { slug: 'rdr2__micah-bell',                      label: 'Micah Bell',                 views: 12,  downloads: 2   },
]

async function seed() {
  console.log(`Seeding ${entries.length} analytics entries...\n`)
  let ok = 0
  let fail = 0

  for (const e of entries) {
    const { error } = await supabase
      .from('analytics')
      .upsert(
        { slug: e.slug, type: 'character', label: e.label, views: e.views, downloads: e.downloads, updated_at: new Date().toISOString() },
        { onConflict: 'slug,type' }
      )

    if (error) {
      console.error(`FAIL  ${e.slug}: ${error.message}`)
      fail++
    } else {
      console.log(`OK    ${e.slug} (${e.views}v / ${e.downloads}d)`)
      ok++
    }
  }

  console.log(`\nDone. ${ok} inserted/updated, ${fail} failed.`)
}

seed()
