"use client";

import { motion } from "framer-motion";
import { 
  Shield, 
  Database, 
  Wrench, 
  TrendingUp, 
  Lightbulb, 
  Lock,
  CheckCircle
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { fadeInUp, staggerContainer, springPop } from "@/lib/animations";

const challenges = [
  {
    icon: Shield,
    title: "Qualité de service",
    description: "Garantir une disponibilité et des performances optimales de vos systèmes d'information pour maintenir la satisfaction client et la continuité d'activité."
  },
  {
    icon: Database,
    title: "Maîtrise des données",
    description: "Assurer la gouvernance, l'intégrité et la sécurité de vos données critiques tout en optimisant leur exploitation pour la prise de décision."
  },
  {
    icon: Wrench,
    title: "Maintenabilité et coûts",
    description: "Optimiser les coûts d'exploitation et de maintenance de vos systèmes tout en garantissant leur évolutivité et leur pérennité."
  },
  {
    icon: TrendingUp,
    title: "Résilience SI face aux changements",
    description: "Adapter rapidement vos systèmes d'information aux évolutions réglementaires, organisationnelles et technologiques du secteur financier."
  },
  {
    icon: Lightbulb,
    title: "Opportunités technologiques et innovation",
    description: "Identifier et intégrer les nouvelles technologies (IA, cloud, blockchain) pour créer de la valeur et améliorer l'expérience client."
  },
  {
    icon: Lock,
    title: "Sécurité",
    description: "Protéger vos actifs informationnels contre les cybermenaces et assurer la conformité aux exigences réglementaires (RGPD, PCI-DSS)."
  }
];

export default function ChallengesSection() {
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
            Vos Enjeux
          </motion.div>
          
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance"
          >
            Les Défis du{" "}
            <span className="text-primary">Secteur Financier</span>
          </motion.h2>
          
          <motion.p
            variants={fadeInUp}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Face à la transformation digitale et aux évolutions réglementaires, 
            les institutions financières doivent relever des enjeux majeurs pour 
            maintenir leur compétitivité et leur conformité.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {challenges.map((challenge, index) => (
            <motion.div
              key={challenge.title}
              variants={springPop}
              whileHover="hover"
              className="group"
            >
              <Card className="h-full border-0 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:border-primary/20">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                    <challenge.icon className="h-8 w-8 text-primary" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {challenge.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {challenge.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
