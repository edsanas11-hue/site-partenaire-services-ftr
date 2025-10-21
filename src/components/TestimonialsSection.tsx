"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const testimonials = [
  {
    content: "FTR Services nous a accompagnés dans notre transformation digitale avec une expertise remarquable. Leur approche méthodologique et leur connaissance du secteur bancaire ont été déterminantes pour le succès de notre projet.",
    author: "Marie Dubois",
    position: "Directrice des Systèmes d'Information",
    company: "Banque Européenne",
    avatar: "/avatars/marie-dubois.jpg",
    rating: 5
  },
  {
    content: "L'équipe de FTR Services a su comprendre nos enjeux organisationnels et proposer des solutions adaptées. Leur accompagnement au changement a facilité l'adoption des nouveaux processus par nos équipes.",
    author: "Jean-Pierre Martin",
    position: "Directeur Général",
    company: "Crédit Régional",
    avatar: "/avatars/jean-pierre-martin.jpg",
    rating: 5
  },
  {
    content: "Excellente collaboration avec FTR Services. Leur expertise en conformité réglementaire nous a permis de mettre en place des processus robustes et de maintenir notre conformité RGPD sans impact sur nos opérations.",
    author: "Sophie Laurent",
    position: "Responsable Conformité",
    company: "Banque Privée",
    avatar: "/avatars/sophie-laurent.jpg",
    rating: 5
  }
];

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-[#F7F8FA]">
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
            <Star className="h-4 w-4 mr-2" />
            Témoignages Clients
          </motion.div>
          
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance"
          >
            Ce Que Disent Nos{" "}
            <span className="text-primary">Clients</span>
          </motion.h2>
          
          <motion.p
            variants={fadeInUp}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Découvrez les retours d'expérience de nos clients qui nous font confiance 
            pour leurs projets de transformation digitale et d'organisation.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="group"
            >
              <Card className="h-full border-0 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:border-primary/20">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  
                  <Quote className="h-8 w-8 text-primary/30 mb-4" />
                  
                  <blockquote className="text-muted-foreground leading-relaxed mb-6 italic">
                    "{testimonial.content}"
                  </blockquote>
                  
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {testimonial.author.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <div className="font-semibold text-foreground">
                        {testimonial.author}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.position}
                      </div>
                      <div className="text-sm text-primary font-medium">
                        {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

