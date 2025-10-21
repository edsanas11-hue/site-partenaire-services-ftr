"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { fadeInUp, staggerContainer, springPop } from "@/lib/animations";

const clients = [
  { name: "Banque Populaire", logo: "/clients/banque populaire.png" },
  { name: "BNP Paribas", logo: "/clients/bnp paribas.webp" },
  { name: "Crédit du Maroc", logo: "/clients/crédit du maroc.png" },
  { name: "Caisse interprofessionnelle marocaine de retraites", logo: "/clients/CIMR.png" },
  { name: "EQDOM", logo: "/clients/eqdom.png" },
  { name: "Hightech Payment Systems", logo: "/clients/hightech payment systems.png" },
  { name: "Société Générale", logo: "/clients/societe generale.png" },
  { name: "Saham Bank", logo: "/clients/Saham bank.png" },
];

export default function TrustedClientsSection() {
  return (
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
            <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
            Ils nous font confiance
          </motion.div>
          
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance"
          >
            Nos{" "}
            <span className="text-primary">Partenaires</span>{" "}
            de Confiance
          </motion.h2>
          
          <motion.p
            variants={fadeInUp}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Des institutions bancaires de renom nous font confiance pour 
            accompagner leur transformation digitale et organisationnelle.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              variants={springPop}
              whileHover="hover"
              className="group"
            >
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:scale-105 border border-gray-100 h-36 flex flex-col items-center justify-center">
                <div className="relative h-16 w-full flex items-center justify-center mb-3">
                  <Image
                    src={client.logo}
                    alt={`Logo ${client.name}`}
                    width={120}
                    height={64}
                    className="max-h-16 max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xs font-medium text-gray-600 group-hover:text-primary transition-colors leading-tight">
                    {client.name}
                  </h3>
                </div>
              </div>
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
          <p className="text-lg text-muted-foreground mb-8">
            Rejoignez nos partenaires de confiance
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Devenir Partenaire
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
