"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeInUp, fadeInRight, staggerContainer } from "@/lib/animations";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-[#0A1B2E] via-[#0A1B2E] to-[#1a2b3e] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={shouldReduceMotion ? {} : staggerContainer}
            initial="initial"
            animate="animate"
            className="text-white"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center px-4 py-2 bg-primary/20 border border-primary/30 rounded-full text-primary text-sm font-medium mb-6"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Expert reconnu secteur bancaire
            </motion.div>
            
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-balance"
            >
              Conseil en Organisation &{" "}
              <span className="text-primary">Systèmes d&apos;Information</span>
            </motion.h1>
            
                        <motion.p
                          variants={fadeInUp}
                          className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl"
                        >
                          Nous accompagnons les institutions financières dans leur transformation 
                          digitale avec une expertise reconnue en organisation et systèmes d&apos;information.
                        </motion.p>
            
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Button asChild size="lg" className="group">
                <Link href="/contact">
                  Démarrer un projet
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/20 hover:border-white/40 bg-white/5 backdrop-blur-sm group"
                asChild
              >
                <Link href="/references">
                  <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  Voir nos références
                </Link>
              </Button>
            </motion.div>
            
            {/* Stats */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-3 gap-8"
            >
              {[
                { number: "10+", label: "Années d'expérience" },
                { number: "50+", label: "Projets réalisés" },
                { number: "100%", label: "Satisfaction client" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={fadeInUp}
                  className="text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Right Content - Visual */}
          <motion.div
            variants={fadeInRight}
            initial="initial"
            animate="animate"
            className="relative"
          >
            <div className="relative">
              {/* Main Card */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="h-4 bg-white/20 rounded w-3/4"></div>
                    <div className="h-4 bg-white/20 rounded w-1/2"></div>
                    <div className="h-4 bg-white/20 rounded w-2/3"></div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-primary/20 rounded-lg p-4 border border-primary/30">
                      <div className="text-primary font-semibold text-sm">Organisation</div>
                      <div className="text-white/80 text-xs mt-1">Optimisation des processus</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                      <div className="text-white font-semibold text-sm">Systèmes</div>
                      <div className="text-white/80 text-xs mt-1">Architecture IT</div>
                    </div>
                  </div>
                </div>
              </div>
              
              
              <motion.div
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-4 -left-4 bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20"
              >
                <div className="text-white text-sm font-medium">Expertise</div>
                <div className="text-primary text-xs">Bancaire</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}
