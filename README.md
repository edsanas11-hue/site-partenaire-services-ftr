# FTR Services - Site Vitrine Premium

Site vitrine professionnel pour FTR Services, cabinet de conseil en organisation & systèmes d'information spécialisé dans le secteur bancaire.

## 🎯 Objectif

Créer un site vitrine premium qui donne une impression moderne, corporate, sobre et dynamique en moins de 3 secondes, avec une image haut de gamme et très professionnelle.

## 🚀 Technologies Utilisées

- **Next.js 14** (App Router) avec TypeScript strict
- **Tailwind CSS** pour le styling
- **shadcn/ui** pour les composants UI
- **Framer Motion** pour les animations
- **Lucide React** pour les icônes

## 🎨 Identité Visuelle

### Couleurs
- **Primaire** : Rouge #E53935 (hover #EF5350, dark #B71C1C)
- **Bleu-nuit** : #0A1B2E (sections hero)
- **Gris clair** : #F7F8FA (backgrounds)
- **Gris** : #6B7280 (textes secondaires)
- **Blanc** : #FFFFFF (contraste)

### Typographie
- **Police** : Inter (Google Fonts)
- **Contraste** : AA minimum

## 📱 Pages Principales

- **Accueil** - Hero, stats animées, grilles de features, témoignages, CTA
- **Expertises** - Grilles d'expertises avec animations et détails
- **Références** - Timeline filtrable des projets réalisés
- **À propos** - Équipe, valeurs, histoire de l'entreprise
- **Carrières** - Offres d'emploi et candidature spontanée
- **FAQ** - Questions fréquentes avec accordéons
- **Contact** - Formulaires de contact et informations

## ✨ Fonctionnalités

### Animations Framer Motion
- `fadeInUp` - Apparition depuis le bas
- `staggerContainer` - Animation en cascade
- `slideIn` - Glissement latéral
- `parallaxY` - Effet parallaxe
- `counterReveal` - Compteurs animés
- `springPop` - Effet ressort
- `scaleIn` - Zoom d'apparition

### Composants UI
- Header sticky avec navigation responsive
- Footer structuré avec liens et informations
- Cards avec hover effects
- Formulaires avec validation
- Modales et accordéons
- Badges et avatars
- Boutons avec animations

### SEO & Performance
- Metadata optimisée pour chaque page
- Sitemap.xml automatique
- Robots.txt configuré
- Manifest PWA
- Images optimisées
- Code structuré et accessible

## 🛠️ Installation

```bash
# Cloner le projet
git clone [repository-url]
cd site-partenaire-services-ftr

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build pour la production
npm run build

# Lancer en production
npm start
```

## 📁 Structure du Projet

```
src/
├── app/                    # Pages Next.js 14 (App Router)
│   ├── about/             # Page À propos
│   ├── careers/           # Page Carrières
│   ├── contact/           # Page Contact
│   ├── expertises/        # Page Expertises
│   ├── faq/               # Page FAQ
│   ├── references/        # Page Références
│   ├── globals.css        # Styles globaux
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Page d'accueil
│   ├── manifest.ts        # PWA manifest
│   ├── robots.ts          # Robots.txt
│   └── sitemap.ts         # Sitemap.xml
├── components/            # Composants réutilisables
│   ├── ui/               # Composants shadcn/ui
│   ├── Header.tsx        # Header avec navigation
│   ├── Footer.tsx        # Footer
│   ├── Hero.tsx          # Section hero
│   ├── StatsSection.tsx  # Section statistiques
│   ├── FeaturesSection.tsx # Section features
│   ├── TestimonialsSection.tsx # Témoignages
│   └── CTASection.tsx    # Call-to-action
└── lib/                  # Utilitaires
    ├── animations.ts     # Animations Framer Motion
    └── utils.ts          # Utilitaires généraux
```

## 🎨 Design System

### Container
- `max-w-7xl` avec `px-4 sm:px-6 lg:px-8`
- Sections avec `py-16 md:py-24`

### Animations
- Durée standard : 0.6s
- Easing : `[0.6, -0.05, 0.01, 0.99]`
- Délais échelonnés : 0.1s entre éléments

### Responsive
- Mobile-first approach
- Breakpoints : sm (640px), md (768px), lg (1024px), xl (1280px)

## 🚀 Déploiement

Le site est optimisé pour le déploiement sur :
- **Vercel** (recommandé)
- **Netlify**
- **AWS Amplify**
- Tout hébergeur supportant Next.js

## 📊 Performance

- **Lighthouse Score** : 95+ (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals** : Optimisés
- **Images** : Optimisées avec Next.js Image
- **Fonts** : Optimisées avec Google Fonts

## 🔧 Configuration

### Variables d'environnement
```env
NEXT_PUBLIC_SITE_URL=https://ftr-services.fr
NEXT_PUBLIC_CONTACT_EMAIL=contact@ftr-services.fr
NEXT_PUBLIC_PHONE=+33 1 23 45 67 89
```

### Personnalisation
- Couleurs dans `src/app/globals.css`
- Animations dans `src/lib/animations.ts`
- Contenu dans les fichiers de pages

## 📝 Maintenance

- Mise à jour régulière des dépendances
- Monitoring des performances
- Tests d'accessibilité
- Optimisation SEO continue

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est propriétaire de FTR Services. Tous droits réservés.

## 📞 Support

Pour toute question ou support technique :
- Email : contact@ftr-services.fr
- Téléphone : +33 1 23 45 67 89

---

**FTR Services** - Expert en conseil en organisation & systèmes d'information pour le secteur bancaire.