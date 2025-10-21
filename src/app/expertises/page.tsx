"use client";

import { motion } from "framer-motion";
import { 
  Building2, 
  CheckCircle,
  ArrowRight,
  Award,
  Users,
  BarChart3,
  Database,
  Code,
  Cloud,
  Settings,
  Shield,
  Briefcase,
  Target,
  Zap,
  TrendingUp,
  Globe,
  Cpu,
  Smartphone,
  CreditCard,
  FileText,
  Lock,
  Network,
  Server,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fadeInUp, staggerContainer, springPop } from "@/lib/animations";
import Link from "next/link";

const valuePropositions = [
  {
    icon: Award,
    title: "Expertise reconnue dans la banque et les systèmes d'information",
    description: "Plus de 10 ans d'expérience dans l'accompagnement des institutions financières"
  },
  {
    icon: Users,
    title: "Base de données de plus de 10 000 profils qualifiés",
    description: "Un réseau étendu de consultants experts dans tous les domaines"
  },
  {
    icon: Target,
    title: "Un interlocuteur unique pour le pilotage des missions",
    description: "Interface simplifiée et suivi personnalisé de vos projets"
  },
  {
    icon: TrendingUp,
    title: "Des tarifs de prestations compétitifs",
    description: "Optimisation des coûts sans compromis sur la qualité"
  }
];

const expertiseDomains = [
  {
    category: "Pilotage & Project Management",
    icon: Settings,
    roles: [
      "Directeur de programme",
      "Chef de projet", 
      "PMO"
    ]
  },
  {
    category: "Monétique & Mobile Payment",
    icon: Smartphone,
    roles: [
      "Chef de projet monétique",
      "Intégrateur monétique",
      "Mobile Banking",
      "Wallet"
    ]
  },
  {
    category: "Finance, Risque & Conformité",
    icon: Shield,
    roles: [
      "Directeur programme KYC",
      "Chefs de projet Refonte Crédit",
      "Finance",
      "Conformité",
      "IFRS"
    ]
  },
  {
    category: "Data, BI & Big Data",
    icon: Database,
    roles: [
      "Chef de projet BI",
      "Consultant Data Factory",
      "Data Governance"
    ]
  },
  {
    category: "Core Banking & ERP",
    icon: Building2,
    roles: [
      "Experts Amplitude",
      "T24",
      "Oracle e-Business Suite",
      "SAP",
      "Intégration et support applicatif"
    ]
  },
  {
    category: "Développement Full Stack & UX/UI",
    icon: Code,
    roles: [
      "Développement Front-end et Back-end",
      "UX/UI design",
      "DevOps"
    ]
  },
  {
    category: "Infrastructure, Cloud & Sécurité",
    icon: Cloud,
    roles: [
      "Ingénierie système",
      "Sécurité SI",
      "Réseau",
      "Virtualisation",
      "VMWARE",
      "Windows AD",
      "Cloud computing"
    ]
  },
  {
    category: "Méthodologies Agiles",
    icon: Zap,
    roles: [
      "Scrum Master",
      "Coach Agile",
      "Product Owner",
      "Accompagnement à la transformation agile"
    ]
  }
];

const keyFigures = [
  {
    number: "10 000+",
    label: "Profils en base de données",
    icon: Users
  },
  {
    number: "100",
    label: "Missions réalisées",
    icon: Briefcase
  },
  {
    number: "3 ans",
    label: "Durée moyenne d'une mission",
    icon: Clock
  },
  {
    number: "100%",
    label: "Taux de couverture des besoins clients",
    icon: Target
  }
];

export default function ExpertisesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-[#0A1B2E] to-[#1a2b3e] text-white">
        <div className="container">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center px-4 py-2 bg-primary/20 border border-primary/30 rounded-full text-primary text-sm font-medium mb-6"
            >
              <Award className="h-4 w-4 mr-2" />
              Nos Expertises
            </motion.div>
            
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance"
            >
              Nos{" "}
              <span className="text-primary">Expertises</span>{" "}
              Métier
            </motion.h1>
            
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-300 mb-8 leading-relaxed"
            >
              Partenaire Services accompagne depuis plus de dix ans les grandes entreprises et institutions financières dans leurs projets d'organisation et de transformation des systèmes d'information. Notre approche repose sur l'expertise, la performance et la proximité client, avec une capacité éprouvée à mobiliser rapidement des consultants hautement qualifiés.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="section-padding bg-white">
        <div className="container">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.1 }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-foreground mb-8"
            >
              Notre <span className="text-primary">Proposition de Valeur</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valuePropositions.map((proposition, index) => (
              <motion.div
                key={index}
                variants={springPop}
                whileHover="hover"
                className="group h-full"
              >
                <Card className="h-full border-0 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:border-primary/20 flex flex-col">
                  <CardHeader className="text-center pb-4 flex-shrink-0">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <proposition.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-lg text-foreground mb-4 leading-tight">
                      {proposition.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex items-center">
                    <p className="text-muted-foreground text-sm leading-relaxed text-center w-full">
                      {proposition.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Domains */}
      <section className="section-padding bg-[#F7F8FA]">
        <div className="container">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.1 }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-foreground mb-8"
            >
              Domaines d'<span className="text-primary">Expertise</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertiseDomains.map((domain, index) => (
              <motion.div
                key={index}
                variants={springPop}
                whileHover="hover"
                className="group"
              >
                <Card className="h-full border-0 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:border-primary/20">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <domain.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-lg text-foreground mb-4">
                      {domain.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {domain.roles.map((role, idx) => (
                        <li key={idx} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                          {role}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Figures */}
      <section className="section-padding bg-white">
        <div className="container">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.1 }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-foreground mb-8"
            >
              Chiffres <span className="text-primary">Clés</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {keyFigures.map((figure, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group-hover:border-primary/20 h-full flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <figure.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {figure.number}
                  </div>
                  <div className="text-sm font-medium text-foreground text-center leading-tight">
                    {figure.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-[#0A1B2E] to-[#1a2b3e] text-white">
        <div className="container text-center">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Prêt à Découvrir Nos{" "}
              <span className="text-primary">Références</span> ?
            </motion.h2>
            
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            >
              Découvrez les projets que nous avons réalisés avec succès pour nos clients du secteur financier.
            </motion.p>
            
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild size="lg" className="group">
                <Link href="/references">
                  Voir nos références
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
