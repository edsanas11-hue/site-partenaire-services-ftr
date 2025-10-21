"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { 
  Users, 
  Target, 
  Award, 
  Heart,
  CheckCircle,
  ArrowRight,
  Building2,
  Globe,
  Lightbulb,
  Shield,
  TrendingUp,
  Handshake,
  Calendar,
  MapPin,
  Mail,
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fadeInUp, staggerContainer, springPop } from "@/lib/animations";
import Link from "next/link";

const background = [
  {
    company: "IBM",
    position: "Directeur de Projet Senior",
    period: "Septembre 2004 – Juin 2013",
    logo: "/background/IBM.png",
    description: "Direction de projets complexes de transformation digitale pour des clients financiers internationaux."
  },
  {
    company: "Ernst & Young",
    position: "Senior Consultant",
    period: "Mai 2001 – Juillet 2004",
    logo: "/background/ernest & young.png",
    description: "Conseil en organisation et audit des systèmes d'information pour des institutions financières."
  },
  {
    company: "Oracle",
    position: "Consultant",
    period: "Août 1998 – Avril 2001",
    logo: "/background/oracle.png",
    description: "Implémentation de solutions Oracle pour l'optimisation des processus financiers."
  }
];

const values = [
  {
    icon: Target,
    title: "Excellence",
    description: "Nous nous engageons à fournir des solutions de la plus haute qualité, en respectant les meilleures pratiques du secteur."
  },
  {
    icon: Heart,
    title: "Proximité",
    description: "Nous privilégions une relation de confiance et de proximité avec nos clients, en nous adaptant à leurs besoins spécifiques."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Nous intégrons les dernières technologies et méthodologies pour offrir des solutions avant-gardistes."
  },
  {
    icon: Shield,
    title: "Intégrité",
    description: "Nous agissons avec transparence et éthique dans toutes nos interventions et recommandations."
  },
  {
    icon: Handshake,
    title: "Partenariat",
    description: "Nous construisons des relations durables basées sur la confiance mutuelle et la collaboration."
  },
  {
    icon: TrendingUp,
    title: "Performance",
    description: "Nous nous concentrons sur la création de valeur mesurable et l'amélioration continue des résultats."
  }
];

const milestones = [
  {
    year: "2013",
    title: "Création de Partenaire Services",
    description: "Fondation du cabinet avec une vision claire : accompagner la transformation digitale du secteur financier."
  },
  {
    year: "2015",
    title: "Premiers Contrats Majeurs",
    description: "Signature des premiers contrats avec des banques de renom, établissant notre crédibilité sur le marché."
  },
  {
    year: "2018",
    title: "Expansion de l'Équipe",
    description: "Développement de l'équipe et diversification de nos expertises pour répondre à une demande croissante."
  },
  {
    year: "2020",
    title: "Adaptation Digitale",
    description: "Mise en place de solutions de conseil à distance et adaptation aux nouveaux enjeux post-COVID."
  },
  {
    year: "2022",
    title: "Reconnaissance Sectorielle",
    description: "Reconnaissance par les pairs et obtention de certifications sectorielles importantes."
  },
  {
    year: "2024",
    title: "Innovation Continue",
    description: "Intégration des dernières technologies (IA, Cloud) dans nos solutions de conseil."
  }
];

export default function AboutPage() {
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
              <Building2 className="h-4 w-4 mr-2" />
              À Propos
            </motion.div>
            
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance"
            >
              Partenaire Services
            </motion.h1>
            
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-300 mb-8 leading-relaxed"
            >
              Depuis 2013, nous accompagnons les institutions financières dans leur transformation 
              digitale avec une expertise reconnue en organisation et systèmes d'information.
            </motion.p>
            
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild size="lg">
                <Link href="/contact">
                  Nous contacter
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/50 text-white hover:bg-white/20 hover:border-white/70 bg-white/10">
                <Link href="/references">
                  Nos références
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Anas Faiq Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-16"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-6"
            >
              <Users className="h-4 w-4 mr-2" />
              Notre Dirigeant
            </motion.div>
            
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance"
            >
              <span className="text-primary">Anas Faiq</span>
            </motion.h2>
            
            <motion.p
              variants={fadeInUp}
              className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8"
            >
              Associé unique gérant de Partenaire Services, expert en conseil organisationnel 
              et systèmes d'information avec plus de 20 ans d'expérience dans le secteur financier.
            </motion.p>
          </motion.div>

          {/* Background Professionnel */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="mb-16"
          >
            <motion.h3
              variants={fadeInUp}
              className="text-2xl font-bold text-foreground mb-8 text-center"
            >
              Parcours Professionnel
            </motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {background.map((exp, index) => (
                <motion.div
                  key={exp.company}
                  variants={springPop}
                  whileHover="hover"
                  className="group"
                >
                  <Card className="h-full border-0 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:border-primary/20">
                    <CardContent className="p-8 text-center">
                      <div className="relative h-16 w-full flex items-center justify-center mb-6">
                        <Image
                          src={exp.logo}
                          alt={`Logo ${exp.company}`}
                          width={120}
                          height={64}
                          className="max-h-16 w-auto object-contain"
                        />
                      </div>
                      
                      <h4 className="text-lg font-semibold text-foreground mb-2">
                        {exp.company}
                      </h4>
                      
                      <p className="text-primary font-medium mb-2">
                        {exp.position}
                      </p>
                      
                      <p className="text-sm text-muted-foreground mb-4">
                        {exp.period}
                      </p>
                      
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {exp.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="section-padding bg-gray-50">
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
              <Heart className="h-4 w-4 mr-2" />
              Nos Valeurs
            </motion.div>
            
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance"
            >
              Nos{" "}
              <span className="text-primary">Valeurs</span>
            </motion.h2>
            
            <motion.p
              variants={fadeInUp}
              className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              Les principes qui guident notre approche et notre relation avec nos clients.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                variants={springPop}
                whileHover="hover"
                className="group"
              >
                <Card className="h-full border-0 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:border-primary/20">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                    
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      {value.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Histoire */}
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
              <Calendar className="h-4 w-4 mr-2" />
              Notre Histoire
            </motion.div>
            
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance"
            >
              Notre{" "}
              <span className="text-primary">Histoire</span>
            </motion.h2>
            
            <motion.p
              variants={fadeInUp}
              className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              Plus de 10 ans d'expertise et d'innovation au service de la transformation financière.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="relative"
          >
            {/* Timeline */}
            <div className="absolute left-1/2 transform -translate-x-0.5 w-0.5 h-full bg-primary/20 hidden lg:block"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  variants={fadeInUp}
                  className={`flex items-center ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  <div className="w-full lg:w-1/2 lg:px-8">
                    <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-8">
                        <div className="flex items-center mb-4">
                          <Badge variant="secondary" className="mr-4">
                            {milestone.year}
                          </Badge>
                          <div className="w-4 h-4 bg-primary rounded-full"></div>
                        </div>
                        
                        <h3 className="text-xl font-semibold text-foreground mb-3">
                          {milestone.title}
                        </h3>
                        
                        <p className="text-muted-foreground leading-relaxed">
                          {milestone.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="hidden lg:block w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-[#0A1B2E] to-[#1a2b3e] text-white">
        <div className="container">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance"
            >
              Prêt à Travailler avec{" "}
              <span className="text-primary">Partenaire Services ?</span>
            </motion.h2>
            
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-300 mb-8 leading-relaxed"
            >
              Découvrez comment notre expertise peut transformer votre organisation 
              et optimiser vos systèmes d'information.
            </motion.p>
            
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild size="lg">
                <Link href="/contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Nous contacter
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/50 text-white hover:bg-white/20 hover:border-white/70 bg-white/10">
                <Link href="/references">
                  <Phone className="mr-2 h-4 w-4" />
                  Nos références
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}