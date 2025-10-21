import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Administration - Partenaire Services',
  description: 'Interface d\'administration pour la gestion des offres d\'emploi',
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <meta name="robots" content="noindex,nofollow" />
      </head>
      <body>{children}</body>
    </html>
  );
}

