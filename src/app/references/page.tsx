"use client";

import { motion } from "framer-motion";
import { 
  Building2, 
  CheckCircle,
  ArrowRight,
  Award,
  CreditCard,
  BarChart3,
  Database,
  Code,
  Cloud,
  Settings,
  Shield,
  Users,
  Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fadeInUp, staggerContainer, springPop } from "@/lib/animations";
import Link from "next/link";

const referenceCategories = [
  {
    id: "banques-filiales",
    title: "Banques & Filiales Bancaires",
    icon: Building2,
    color: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-600",
    missions: [
      {
        client: "Institution bancaire majeure",
        contract: "Contrat-cadre en régie",
        domains: ["Monétique", "Mobile Payment", "KYC", "Data", "BI", "Infrastructure", "Core Banking (Amplitude)"],
        profiles: ["Chef de projet KYC", "Consultant BI", "Expert Amplitude", "Ingénieur sécurité", "Chef de projet monétique"]
      },
      {
        client: "Filiales technologiques",
        contract: "Contrat-cadre",
        domains: ["Sécurité SI", "Réseaux", "Télécom", "Développement SI", "AMOA"],
        profiles: ["Expert Crédit & Engagement", "Chef de projet montée de version Amplitude", "Expert technique Amplitude"]
      }
    ]
  },
  {
    id: "monetique-paiement",
    title: "Monétique & Paiement Mobile",
    icon: CreditCard,
    color: "bg-green-50 border-green-200",
    iconColor: "text-green-600",
    missions: [
      {
        client: "Éditeurs monétiques",
        contract: "Missions d'intégration monétique, maintenance, et développement mobile banking",
        domains: ["Intégration monétique", "Maintenance systèmes", "Développement mobile banking"],
        profiles: ["Chef de projet Monétique", "Intégrateur", "Consultant Run", "Chef de projet Wallet et Mobile Payment"]
      },
      {
        client: "Sociétés de services",
        contract: "Développement et maintenance de solutions de paiement",
        domains: ["Solutions de paiement", "Intégration API", "Sécurité des transactions"],
        profiles: ["Développeur Full Stack", "Expert sécurité", "Chef de projet technique"]
      }
    ]
  },
  {
    id: "data-bi",
    title: "Data, BI & Big Data",
    icon: BarChart3,
    color: "bg-purple-50 border-purple-200",
    iconColor: "text-purple-600",
    missions: [
      {
        client: "Institutions financières",
        contract: "Missions de conception et pilotage BI",
        domains: ["Data Factory", "Data Governance", "Big Data Analytics", "Reporting avancé"],
        profiles: ["Chef de projet AMOA BI", "Consultant Big Data", "Data Engineer", "Analyste BI"]
      },
      {
        client: "Groupes bancaires",
        contract: "Projets de transformation data",
        domains: ["Migration données", "Data Lake", "Machine Learning", "Intelligence artificielle"],
        profiles: ["Data Scientist", "ML Engineer", "Data Architect", "Chef de projet Data"]
      }
    ]
  },
  {
    id: "core-banking-erp",
    title: "Core Banking & ERP",
    icon: Database,
    color: "bg-orange-50 border-orange-200",
    iconColor: "text-orange-600",
    missions: [
      {
        client: "Banques commerciales",
        contract: "Refonte et montée de version du CBS Amplitude",
        domains: ["Core Banking System", "Amplitude", "T24", "Migration données"],
        profiles: ["Expert Amplitude", "Consultant technique", "Chef de projet Upgrade", "Analyste fonctionnel"]
      },
      {
        client: "Institutions financières",
        contract: "Intégration Oracle e-Business Suite",
        domains: ["Oracle eBS", "SAP", "Intégration ERP", "Support applicatif"],
        profiles: ["Consultant fonctionnel Oracle eBS", "Consultant technique", "Chef de projet ERP", "Analyste métier"]
      }
    ]
  },
  {
    id: "securite-infrastructure",
    title: "Sécurité, Réseau & Infrastructure",
    icon: Shield,
    color: "bg-red-50 border-red-200",
    iconColor: "text-red-600",
    missions: [
      {
        client: "Organisations financières",
        contract: "Interventions sur la conformité et la sécurité du parc SI",
        domains: ["Sécurité SI", "Conformité", "Infrastructure", "Réseaux"],
        profiles: ["RSSI", "Ingénieurs réseau & sécurité", "Administrateurs systèmes", "Auditeurs sécurité"]
      },
      {
        client: "Groupes bancaires",
        contract: "Certification et maintenance infrastructure",
        domains: ["Certification ISO 27001", "Maintenance infrastructure", "Support bureautique", "Monitoring"],
        profiles: ["Expert sécurité", "Ingénieur infrastructure", "Technicien support", "Chef de projet sécurité"]
      }
    ]
  },
  {
    id: "pilotage-projet",
    title: "Pilotage & Project Management",
    icon: Settings,
    color: "bg-indigo-50 border-indigo-200",
    iconColor: "text-indigo-600",
    missions: [
      {
        client: "Institutions financières",
        contract: "Contrats de direction de programmes SI",
        domains: ["Direction de programme", "PMO", "Roadmap SI", "Gouvernance"],
        profiles: ["Directeur de programme", "Chef de projet", "PMO", "Coordinateur projet"]
      },
      {
        client: "Banques et établissements",
        contract: "PMO Finance & Risque",
        domains: ["PMO Finance", "Gestion des risques", "Reporting", "Suivi budgétaire"],
        profiles: ["PMO Senior", "Chef de projet Finance", "Analyste risques", "Coordinateur PMO"]
      }
    ]
  }
];

const keyStats = [
  {
    number: "10 000+",
    label: "Consultants référencés",
    icon: Users
  },
  {
    number: "100+",
    label: "Missions réalisées",
    icon: Briefcase
  },
  {
    number: "3 ans",
    label: "Durée moyenne des missions",
    icon: Award
  },
  {
    number: "100%",
    label: "Taux de couverture des besoins",
    icon: CheckCircle
  }
];

export default function ReferencesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-[#0A1B2E] to-[#1a2b3e] text-white">
        <div className="container">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-6"
            >
              <Award className="h-4 w-4 mr-2" />
              Nos Références
            </motion.div>
            
            <motion.h1
              variants={fadeInUp}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance"
            >
              Références &{" "}
              <span className="text-primary">Projets Réalisés</span>
            </motion.h1>
            
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-300 mb-8 leading-relaxed"
            >
              Découvrez nos projets récents et les références que nous avons réalisées avec succès pour nos clients du secteur bancaire. Cette sélection n'est pas exhaustive et représente une partie de notre portefeuille.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
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
              Nos <span className="text-primary">Chiffres Clés</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Une expertise reconnue et des résultats qui parlent d'eux-mêmes
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {keyStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={springPop}
                whileHover="hover"
                className="group h-full"
              >
                <Card className="h-full border-0 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:border-primary/20 flex flex-col">
                  <CardHeader className="text-center pb-4 flex-shrink-0">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <stat.icon className="h-8 w-8 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col items-center justify-center text-center">
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-3">
                      {stat.number}
                    </div>
                    <div className="text-sm font-medium text-foreground leading-tight">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
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
              Nos Références par{" "}
              <span className="text-primary">Catégorie</span>
            </motion.h2>
          </motion.div>

          <div className="space-y-12">
            {referenceCategories.map((category, index) => (
              <motion.div
                key={category.id}
                variants={fadeInUp}
                className="group"
              >
                <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:border-primary/20">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center`}>
                        <category.icon className={`h-8 w-8 ${category.iconColor}`} />
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-foreground mb-2">
                          {category.title}
                        </CardTitle>
                        <p className="text-muted-foreground">
                          Missions spécialisées dans ce domaine d'expertise
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-8">
                    {category.missions.map((mission, missionIndex) => (
                      <div key={missionIndex} className="border-l-4 border-primary/20 pl-6">
                        <div className="mb-4">
                          <h4 className="text-lg font-semibold text-foreground mb-2">
                            {mission.client}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-4">
                            {mission.contract}
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h5 className="font-medium text-foreground mb-3">Domaines d'intervention :</h5>
                            <div className="flex flex-wrap gap-2">
                              {mission.domains.map((domain, domainIndex) => (
                                <Badge key={domainIndex} variant="outline" className="text-xs">
                                  {domain}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h5 className="font-medium text-foreground mb-3">Profils mobilisés :</h5>
                            <div className="flex flex-wrap gap-2">
                              {mission.profiles.map((profile, profileIndex) => (
                                <Badge key={profileIndex} variant="secondary" className="text-xs">
                                  {profile}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Conclusion Section */}
      <section className="section-padding bg-gradient-to-br from-[#0A1B2E] to-[#1a2b3e] text-white">
        <div className="container">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.1 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Un Acteur de Référence
            </motion.h2>
            
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-300 mb-8 leading-relaxed"
            >
              Fort de plus de 10 000 consultants référencés et d'une expertise éprouvée dans le secteur bancaire, Partenaire Services s'impose comme un acteur de référence dans l'accompagnement à la transformation digitale des organisations.
            </motion.p>
            
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild size="lg" className="group">
                <Link href="/contact">
                  Démarrer un projet
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/50 text-white hover:bg-white/20 hover:border-white/70 bg-white/10"
                asChild
              >
                <Link href="/expertises">
                  Découvrir nos expertises
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}