"use client";
import { motion } from "framer-motion";
import { 
  HelpCircle, 
  Search,
  ChevronDown,
  CheckCircle,
  ArrowRight,
  Mail,
  Phone,
  MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { fadeInUp, staggerContainer, springPop } from "@/lib/animations";
import Link from "next/link";
import { useState } from "react";


const faqCategories = [
  {
    id: "general",
    title: "Questions Générales",
    icon: HelpCircle,
    questions: [
      {
        question: "Qu'est-ce que Partenaire Services ?",
        answer: "Partenaire Services est un cabinet de conseil spécialisé dans l'accompagnement des institutions financières dans leur transformation digitale. Nous proposons des services en conseil en organisation, systèmes d'information, conformité et gestion du changement."
      },
      {
        question: "Depuis combien de temps Partenaire Services existe-t-il ?",
        answer: "Partenaire Services a été créé en 2013, nous avons donc plus de 10 ans d'expérience dans le secteur financier. Nous avons accompagné plus de 25 clients et réalisé plus de 50 projets avec succès."
      },
      {
        question: "Dans quels secteurs intervenez-vous ?",
        answer: "Nous nous spécialisons exclusivement dans le secteur financier. Cela inclut les banques commerciales, les banques régionales, les caisses d'épargne, les banques privées et les institutions financières."
      },
      {
        question: "Où êtes-vous situés ?",
        answer: "Notre siège social est situé à Paris, mais nous intervenons dans toute la France. Nous proposons également des services de conseil à distance et des missions sur site selon les besoins de nos clients."
      }
    ]
  },
  {
    id: "services",
    title: "Nos Services",
    icon: CheckCircle,
    questions: [
      {
        question: "Quels sont vos domaines d'expertise ?",
        answer: "Nos domaines d'expertise incluent : le conseil en organisation et processus métier, l'architecture et l'intégration de systèmes d'information, la conformité réglementaire et l'audit, la transformation digitale, la gestion du changement, et l'optimisation des performances."
      },
      {
        question: "Proposez-vous des formations ?",
        answer: "Oui, nous proposons des formations sur mesure pour vos équipes, notamment sur les nouveaux outils, processus et méthodologies que nous mettons en place. Nous organisons également des sessions de sensibilisation et d'accompagnement au changement."
      },
      {
        question: "Travaillez-vous avec des partenaires technologiques ?",
        answer: "Nous travaillons avec les principaux éditeurs de solutions du marché bancaire (Microsoft, AWS, Salesforce, etc.) et avons des partenariats privilégiés pour garantir la meilleure expertise technique et les meilleures pratiques."
      },
      {
        question: "Proposez-vous un support post-projet ?",
        answer: "Absolument. Nous proposons un support post-déploiement et un accompagnement continu pour garantir la réussite de vos projets. Cela inclut le monitoring, l'optimisation et l'évolution de vos solutions."
      }
    ]
  },
  {
    id: "methodology",
    title: "Méthodologie",
    icon: ArrowRight,
    questions: [
      {
        question: "Comment se déroule un projet type ?",
        answer: "Un projet se déroule généralement en 3 phases : 1) Analyse et diagnostic de votre situation actuelle, 2) Définition de la stratégie et planification, 3) Mise en œuvre avec accompagnement et suivi. La durée varie selon la complexité du projet (de 2 à 18 mois)."
      },
      {
        question: "Quelle est votre approche méthodologique ?",
        answer: "Nous utilisons des méthodologies éprouvées (Agile, Lean Six Sigma, ITIL) adaptées au secteur bancaire. Notre approche est collaborative, itérative et centrée sur la création de valeur pour nos clients."
      },
      {
        question: "Comment garantissez-vous la qualité de vos livrables ?",
        answer: "Nous appliquons des processus de qualité stricts avec des revues de code, des tests, des validations client et des certifications. Tous nos consultants sont certifiés dans leurs domaines d'expertise et suivent des formations continues."
      },
      {
        question: "Travaillez-vous en mode projet ou en régie ?",
        answer: "Nous nous adaptons à vos besoins. Nous pouvons travailler en mode projet avec des objectifs et livrables définis, ou en régie pour un accompagnement continu. Nous proposons également des forfaits d'accompagnement annuels."
      }
    ]
  },
  {
    id: "pricing",
    title: "Tarifs & Conditions",
    icon: CheckCircle,
    questions: [
      {
        question: "Comment sont calculés vos tarifs ?",
        answer: "Nos tarifs sont calculés en fonction de la complexité du projet, de la durée d'intervention, du niveau d'expertise requis et des ressources mobilisées. Nous proposons des devis personnalisés et transparents sans frais cachés."
      },
      {
        question: "Proposez-vous des forfaits ?",
        answer: "Oui, nous proposons des forfaits d'accompagnement annuels pour les clients qui souhaitent un suivi continu. Ces forfaits incluent un certain nombre de jours de conseil, des formations et un support prioritaire."
      },
      {
        question: "Quelles sont vos conditions de paiement ?",
        answer: "Nous proposons des conditions de paiement flexibles adaptées à vos contraintes budgétaires. Généralement, nous facturons par tranches selon l'avancement du projet, avec un acompte à la signature."
      },
      {
        question: "Y a-t-il des frais de déplacement ?",
        answer: "Les frais de déplacement sont inclus dans nos tarifs pour les missions en France métropolitaine. Pour les missions à l'étranger ou les déplacements exceptionnels, nous les facturons séparément avec transparence."
      }
    ]
  },
  {
    id: "contact",
    title: "Contact & Devis",
    icon: Mail,
    questions: [
      {
        question: "Comment puis-je obtenir un devis ?",
        answer: "Vous pouvez nous contacter via notre formulaire de contact, par téléphone ou par email. Nous vous proposerons un premier échange gratuit pour comprendre vos besoins et vous fournir un devis personnalisé sous 48h."
      },
      {
        question: "Proposez-vous un premier entretien gratuit ?",
        answer: "Oui, nous proposons un premier entretien gratuit de 30 minutes pour échanger sur vos besoins et vous présenter nos services. Cet entretien peut se faire en visioconférence ou en présentiel selon votre préférence."
      },
      {
        question: "Quel est votre délai de réponse ?",
        answer: "Nous nous engageons à vous répondre sous 24h pour toute demande d'information et sous 48h pour un devis personnalisé. Pour les demandes urgentes, nous proposons un numéro de téléphone direct."
      },
      {
        question: "Puis-je rencontrer l'équipe avant de signer ?",
        answer: "Absolument ! Nous organisons des sessions de présentation de l'équipe et des références clients pour vous permettre de mieux nous connaître avant de vous engager. Nous pouvons également organiser des visites de nos locaux."
      }
    ]
  }
];

const contactMethods = [
  {
    icon: Phone,
    title: "Appel Direct",
    description: "Parlez directement à un expert",
    contact: "+33 1 23 45 67 89",
    action: "Appeler maintenant"
  },
  {
    icon: Mail,
    title: "Email",
    description: "Envoyez-nous votre demande",
    contact: "contact@ftr-services.fr",
    action: "Envoyer un email"
  },
  {
    icon: MessageCircle,
    title: "Chat en Direct",
    description: "Discutez avec notre équipe",
    contact: "Disponible 9h-18h",
    action: "Ouvrir le chat"
  }
];

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

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
              className="inline-flex items-center px-4 py-2 bg-primary/20 border border-primary/30 rounded-full text-primary text-sm font-medium mb-6"
            >
              <HelpCircle className="h-4 w-4 mr-2" />
              Questions Fréquentes
            </motion.div>
            
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance"
            >
              Trouvez Vos{" "}
              <span className="text-primary">Réponses</span>
            </motion.h1>
            
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-300 mb-8 leading-relaxed"
            >
              Découvrez les réponses aux questions les plus fréquemment posées 
              sur nos services et notre expertise.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <motion.div
              variants={fadeInUp}
              className="relative"
            >
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher une question..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="section-padding bg-[#F7F8FA]">
        <div className="container">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-12"
          >
            {filteredCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.id}
                variants={fadeInUp}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <category.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">
                      {category.title}
                    </h2>
                  </div>
                </div>
                
                <div className="p-6">
                  <Accordion type="single" collapsible className="space-y-4">
                    {category.questions.map((faq, faqIndex) => (
                      <AccordionItem
                        key={faqIndex}
                        value={`${category.id}-${faqIndex}`}
                        className="border border-gray-200 rounded-lg px-6"
                      >
                        <AccordionTrigger className="text-left hover:no-underline py-6">
                          <span className="text-lg font-semibold text-foreground">
                            {faq.question}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="pb-6">
                          <p className="text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {searchTerm && filteredCategories.length === 0 && (
            <motion.div
              variants={fadeInUp}
              className="text-center py-12"
            >
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Aucune question trouvée
              </h3>
              <p className="text-muted-foreground mb-6">
                Nous n'avons trouvé aucune question correspondant à votre recherche.
              </p>
              <Button
                variant="outline"
                onClick={() => setSearchTerm("")}
              >
                Effacer la recherche
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-foreground mb-6"
            >
              Vous Ne Trouvez Pas Votre Réponse ?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Notre équipe d'experts est là pour répondre à toutes vos questions 
              et vous accompagner dans vos projets.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                variants={springPop}
                whileHover="hover"
                className="group"
              >
                <Card className="h-full border-0 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:border-primary/20">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                      <method.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {method.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {method.description}
                    </p>
                    <p className="text-primary font-medium mb-6">
                      {method.contact}
                    </p>
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {method.action}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
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
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Prêt à Démarrer Votre Projet ?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-300 mb-8 leading-relaxed"
            >
              Contactez-nous pour discuter de vos besoins et obtenir 
              une proposition personnalisée.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild size="lg" className="group">
                <Link href="/contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Nous contacter
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white/50 text-white hover:bg-white/20 hover:border-white/70 bg-white/10">
                Demander un devis
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
