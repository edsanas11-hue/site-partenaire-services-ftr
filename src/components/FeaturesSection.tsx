"use client";

import { motion } from "framer-motion";
import { 
  Building2, 
  Database, 
  Shield, 
  TrendingUp, 
  Users, 
  Zap,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fadeInUp, staggerContainer, springPop } from "@/lib/animations";
import Link from "next/link";

const features = [
  {
    icon: Building2,
    title: "Conseil en Organisation",
    description: "Optimisation des processus métier et restructuration organisationnelle pour améliorer l'efficacité opérationnelle.",
    benefits: [
      "Audit organisationnel",
      "Redesign des processus",
      "Formation des équipes",
      "Mise en place de KPI"
    ]
  },
  {
    icon: Database,
    title: "Systèmes d'Information",
    description: "Architecture et intégration de systèmes d'information robustes et évolutifs pour le secteur bancaire.",
    benefits: [
      "Architecture IT",
      "Intégration de systèmes",
      "Migration de données",
      "Sécurité informatique"
    ]
  },
  {
    icon: Shield,
    title: "Conformité & Audit",
    description: "Accompagnement dans la conformité réglementaire et audit des systèmes pour garantir la sécurité.",
    benefits: [
      "Audit de conformité",
      "Mise en conformité RGPD",
      "Contrôles internes",
      "Reporting réglementaire"
    ]
  },
  {
    icon: TrendingUp,
    title: "Transformation Digitale",
    description: "Stratégie et mise en œuvre de la transformation digitale pour moderniser les services bancaires.",
    benefits: [
      "Stratégie digitale",
      "Solutions cloud",
      "Automatisation",
      "Innovation technologique"
    ]
  },
  {
    icon: Users,
    title: "Gestion du Changement",
    description: "Accompagnement des équipes dans l'adoption de nouveaux outils et processus organisationnels.",
    benefits: [
      "Formation utilisateurs",
      "Communication",
      "Résistance au changement",
      "Suivi post-déploiement"
    ]
  },
  {
    icon: Zap,
    title: "Performance & Optimisation",
    description: "Amélioration continue des performances et optimisation des ressources pour maximiser la ROI.",
    benefits: [
      "Analyse de performance",
      "Optimisation des coûts",
      "Monitoring continu",
      "Amélioration continue"
    ]
  }
];

export default function FeaturesSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-6"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Nos Expertises
          </motion.div>
          
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance"
          >
            Des Solutions Complètes pour{" "}
            <span className="text-primary">Votre Succès</span>
          </motion.h2>
          
          <motion.p
            variants={fadeInUp}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Nous offrons une gamme complète de services spécialisés dans le secteur bancaire, 
            de la stratégie à la mise en œuvre, en passant par l'accompagnement au changement.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={springPop}
              whileHover="hover"
              className="group"
            >
              <Card className="h-full border-0 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:border-primary/20">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Button asChild size="lg" className="group">
            <Link href="/expertises">
              Découvrir toutes nos expertises
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
