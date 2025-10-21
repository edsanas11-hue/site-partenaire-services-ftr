"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Phone, Mail, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function CTASection() {
  return (
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
            Prêt à Transformer Votre{" "}
            <span className="text-primary">Organisation ?</span>
          </motion.h2>
          
          <motion.p
            variants={fadeInUp}
            className="text-xl text-gray-300 mb-12 leading-relaxed"
          >
            Contactez nos experts pour discuter de vos besoins en conseil en organisation 
            et systèmes d'information. Nous vous accompagnons dans votre transformation digitale.
          </motion.p>
          
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button asChild size="lg" className="group">
              <Link href="/contact">
                <Phone className="mr-2 h-4 w-4" />
                Nous contacter
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          >
            <motion.div
              variants={fadeInUp}
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Appel Direct</h3>
              <p className="text-gray-300 text-sm">
                +33 1 23 45 67 89
              </p>
            </motion.div>
            
            <motion.div
              variants={fadeInUp}
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-gray-300 text-sm">
                edsanas11@gmail.com
              </p>
            </motion.div>
            
            <motion.div
              variants={fadeInUp}
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Rendez-vous</h3>
              <p className="text-gray-300 text-sm">
                Réponse sous 24h
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
