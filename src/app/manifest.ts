import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FTR Services - Conseil en Organisation & Systèmes d\'Information',
    short_name: 'FTR Services',
    description: 'Expert en conseil en organisation et systèmes d\'information pour le secteur bancaire. Nous accompagnons votre transformation digitale avec excellence.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#E53935',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}

