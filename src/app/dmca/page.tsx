'use client'

import { motion } from 'framer-motion'

const sections = [
  {
    heading: 'Before You Submit',
    body: `Before submitting a DMCA notice or initiating legal action, we strongly encourage consultation with your marketing or legal team. Permitting the fan distribution of modified works may align with your interests by enhancing creative engagement and visibility for your content.`,
  },
  {
    heading: 'Our Purpose',
    body: `Idriss Scenes is a non-commercial fan platform that does not generate income or profit from the distribution of copyrighted material. All scenepacks are provided free of charge to the creative editing community.\n\nWe do not condone piracy. This platform is designed solely to facilitate the creative editing of movies, television shows, and video games. All shared footage is strictly limited to individual clips, substantially modified and repurposed, and intended exclusively for video editors engaged in creative fan projects.\n\nAll content is transformative in nature and intended as fan creativity, not commercial exploitation. Credit is always required and attributed to the original source material.`,
  },
  {
    heading: 'Fair Use',
    body: `The clips distributed through Idriss Scenes are believed to qualify as fair use under 17 U.S.C. § 107 of the United States Copyright Act. Factors considered include:`,
    bullets: [
      'The content is transformative — clips are repurposed for creative fan edits, not reproduction of the original work',
      'The content is non-commercial — no revenue is generated from distribution',
      'Only small portions of original works are used — individual clips, not full episodes or films',
      'The use does not substitute or harm the market for the original work — it promotes engagement with it',
    ],
  },
  {
    heading: 'DMCA Takedown Notice Requirements',
    body: `If you believe content on this site infringes your copyright, you may submit a takedown notice. Valid notices must include:`,
    numbered: [
      'Identity of the copyright owner or authorized representative',
      'Identification of the copyrighted work claimed to be infringed',
      'Identification of the specific material to be removed, including the URL where it appears',
      'Your contact information including name, address, and email',
      'A statement of good faith belief that the use is not authorized',
      'A statement under penalty of perjury that the information is accurate',
      'Your physical or electronic signature',
    ],
  },
  {
    heading: 'Submit a Notice',
    body: `To submit a DMCA takedown notice or for any legal inquiries, contact us at`,
    email: 'idriss.ae000@gmail.com',
  },
  {
    heading: 'Disclaimer',
    body: `Idriss Scenes is not affiliated with, endorsed by, or connected to any of the studios, networks, or rights holders whose content appears on this platform. All trademarks, show titles, character names, and related indicia are the property of their respective owners. Content is used purely for fan and creative purposes.`,
  },
]

export default function DmcaPage() {
  return (
    <>
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none" style={{
        zIndex: -1,
        background: 'linear-gradient(to bottom, #100a06 0%, #0d0a07 100%)',
      }} />

      <div className="min-h-screen pt-28 pb-20 px-4">
        <div className="mx-auto max-w-2xl">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="mb-14">
            <p className="mob-label mb-3">Legal</p>
            <h1 style={{
              fontFamily: '"Mobsters","Palatino Linotype",serif',
              color: '#d4c5a9',
              fontSize: 'clamp(2rem, 6vw, 3rem)',
              lineHeight: 1.1,
              marginBottom: '0.75rem',
            }}>
              DMCA &amp; Legal Notice
            </h1>
            <p style={{
              fontFamily: '"IM Fell English", Georgia, serif',
              fontStyle: 'italic',
              color: '#847464',
              fontSize: '1rem',
              lineHeight: 1.6,
            }}>
              Digital Millennium Copyright Act Information &amp; Legal Notice
            </p>
            <div className="divider-stain max-w-[60px] mt-5" />
          </motion.div>

          {/* Sections */}
          <div className="flex flex-col gap-10">
            {sections.map((s, i) => (
              <motion.div
                key={s.heading}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
              >
                <h2 style={{
                  fontFamily: '"Mobsters","Palatino Linotype",serif',
                  color: '#d4c5a9',
                  fontSize: '1.35rem',
                  marginBottom: '0.75rem',
                }}>
                  {s.heading}
                </h2>
                <div style={{
                  borderLeft: '2px solid #3d1215',
                  paddingLeft: '1.25rem',
                }}>
                  {s.body.split('\n\n').map((para, j) => (
                    <p key={j} style={{
                      fontFamily: '"IM Fell English", Georgia, serif',
                      color: '#b0a090',
                      fontSize: '1rem',
                      lineHeight: 1.75,
                      marginBottom: s.bullets || s.numbered || j < s.body.split('\n\n').length - 1 ? '0.85rem' : 0,
                    }}>
                      {para}
                      {s.email && j === 0 && (
                        <>
                          {' '}
                          <a href={`mailto:${s.email}`} style={{ color: '#e55c35', textDecoration: 'underline' }}>
                            {s.email}
                          </a>
                        </>
                      )}
                    </p>
                  ))}

                  {s.bullets && (
                    <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1.25rem' }}>
                      {s.bullets.map((b, j) => (
                        <li key={j} style={{
                          fontFamily: '"IM Fell English", Georgia, serif',
                          color: '#b0a090',
                          fontSize: '1rem',
                          lineHeight: 1.7,
                          marginBottom: '0.4rem',
                          listStyleType: 'disc',
                        }}>
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}

                  {s.numbered && (
                    <ol style={{ margin: '0.5rem 0 0', paddingLeft: '1.25rem' }}>
                      {s.numbered.map((n, j) => (
                        <li key={j} style={{
                          fontFamily: '"IM Fell English", Georgia, serif',
                          color: '#b0a090',
                          fontSize: '1rem',
                          lineHeight: 1.7,
                          marginBottom: '0.4rem',
                          listStyleType: 'decimal',
                        }}>
                          {n}
                        </li>
                      ))}
                    </ol>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </>
  )
}
