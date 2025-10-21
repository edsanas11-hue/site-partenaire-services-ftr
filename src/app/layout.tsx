import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Partenaire Services - Conseil en Organisation & Systèmes d'Information",
  description: "Expert en conseil en organisation et systèmes d'information pour le secteur financier. Nous accompagnons votre transformation digitale avec excellence.",
  keywords: ["conseil", "organisation", "systèmes d'information", "financier", "transformation digitale", "audit"],
  authors: [{ name: "Partenaire Services" }],
  creator: "Partenaire Services",
  publisher: "Partenaire Services",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://partenaire-services.fr"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Partenaire Services - Conseil en Organisation & Systèmes d'Information",
    description: "Expert en conseil en organisation et systèmes d'information pour le secteur financier.",
    url: "https://partenaire-services.fr",
    siteName: "Partenaire Services",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Partenaire Services - Conseil en Organisation & Systèmes d'Information",
    description: "Expert en conseil en organisation et systèmes d'information pour le secteur financier.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="pt-16 md:pt-20">
            {children}
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
