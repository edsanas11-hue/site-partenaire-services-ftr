"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import { counterReveal, staggerContainer } from "@/lib/animations";

const stats = [
  {
    number: 10,
    suffix: "+",
    label: "Années d'expérience",
    description: "Dans le secteur financier",
  },
  {
    number: 50,
    suffix: "+",
    label: "Projets réalisés",
    description: "Avec succès",
  },
  {
    number: 100,
    suffix: "%",
    label: "Satisfaction client",
    description: "Taux de recommandation",
  },
  {
    number: 25,
    suffix: "+",
    label: "Clients accompagnés",
    description: "Institutions bancaires",
  },
];

function Counter({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const startCount = 0;

    const updateCount = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * end);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [end, duration, isInView]);

  return <span ref={ref}>{count}</span>;
}

export default function StatsSection() {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <section className="section-padding bg-[#F7F8FA]">
      <div className="container">
        <motion.div
          variants={shouldReduceMotion ? {} : staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={counterReveal}
              className="text-center group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group-hover:border-primary/20">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  <Counter end={stat.number} />
                  {stat.suffix}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {stat.label}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
