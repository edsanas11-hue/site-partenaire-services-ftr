"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  CheckCircle,
  ArrowRight,
  MessageCircle,
  Calendar,
  User,
  Building2,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { fadeInUp, staggerContainer, springPop } from "@/lib/animations";
import { toast } from "sonner";


const contactInfo = [
  {
    icon: Phone,
    title: "Téléphone",
    details: "+33 1 23 45 67 89",
    description: "Lun-Ven 9h-18h",
    action: "Appeler"
  },
  {
    icon: Mail,
    title: "Email",
    details: "edsanas11@gmail.com",
    description: "Réponse sous 24h",
    action: "Envoyer un email"
  },
  {
    icon: MapPin,
    title: "Adresse",
    details: "123 Avenue des Champs-Élysées",
    description: "75008 Paris, France",
    action: "Voir sur la carte"
  },
  {
    icon: Clock,
    title: "Horaires",
    details: "Lundi - Vendredi",
    description: "9h00 - 18h00",
    action: "Nous contacter"
  }
];

const services = [
  "Conseil en Organisation",
  "Systèmes d'Information",
  "Conformité & Audit",
  "Transformation Digitale",
  "Gestion du Changement",
  "Performance & Optimisation"
];

const projectTypes = [
  "Audit et diagnostic",
  "Stratégie et planification",
  "Mise en œuvre",
  "Formation et accompagnement",
  "Support et maintenance",
  "Autre"
];

const budgets = [
  "Moins de 50k€",
  "50k€ - 100k€",
  "100k€ - 250k€",
  "250k€ - 500k€",
  "Plus de 500k€",
  "À définir"
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    service: "",
    projectType: "",
    budget: "",
    timeline: "",
    description: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Validation des formats
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^(\+33|0)[1-9](\d{8})$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validation des formats
    if (!validateEmail(formData.email)) {
      toast.error("Veuillez entrer une adresse email valide");
      setIsSubmitting(false);
      return;
    }
    
    if (formData.phone && !validatePhone(formData.phone)) {
      toast.error("Veuillez entrer un numéro de téléphone valide (format français)");
      setIsSubmitting(false);
      return;
    }
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('company', formData.company);
      formDataToSend.append('position', formData.position);
      formDataToSend.append('service', formData.service);
      formDataToSend.append('projectType', formData.projectType);
      formDataToSend.append('budget', formData.budget);
      formDataToSend.append('timeline', formData.timeline);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('message', formData.message);

      const response = await fetch('/api/send-contact', {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Message envoyé avec succès ! Nous vous recontacterons sous 24h.");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          company: "",
          position: "",
          service: "",
          projectType: "",
          budget: "",
          timeline: "",
          description: "",
          message: ""
        });
      } else {
        toast.error("Erreur lors de l'envoi du message. Veuillez réessayer.");
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      toast.error("Erreur lors de l'envoi du message. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <MessageCircle className="h-4 w-4 mr-2" />
              Contactez-Nous
            </motion.div>
            
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance"
            >
              Démarrons Votre{" "}
              <span className="text-primary">Projet Ensemble</span>
            </motion.h1>
            
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-300 mb-8 leading-relaxed"
            >
              Contactez nos experts pour discuter de vos besoins et obtenir 
              une proposition personnalisée adaptée à votre organisation.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="section-padding bg-white">
        <div className="container">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                variants={springPop}
                whileHover="hover"
                className="group"
              >
                <Card className="h-full border-0 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:border-primary/20">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                      <info.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {info.title}
                    </h3>
                    <p className="text-primary font-medium mb-2">
                      {info.details}
                    </p>
                    <p className="text-muted-foreground text-sm mb-4">
                      {info.description}
                    </p>
                    <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {info.action}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-padding bg-[#F7F8FA]">
        <div className="container">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Contactez nous pour obtenir une réponse personnalisée
              </h2>
              <p className="text-xl text-muted-foreground">
                Remplissez le formulaire ci-dessous et nous vous recontacterons sous 24h
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                    <User className="h-5 w-5 mr-2 text-primary" />
                    Informations Personnelles
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Prénom *
                      </label>
                      <Input
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        placeholder="Votre prénom"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Nom *
                      </label>
                      <Input
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        placeholder="Votre nom"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="votre@email.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Téléphone
                      </label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+33 1 23 45 67 89"
                      />
                    </div>
                  </div>
                </div>

                {/* Company Information */}
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                    <Building2 className="h-5 w-5 mr-2 text-primary" />
                    Informations Entreprise
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Entreprise *
                      </label>
                      <Input
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                        placeholder="Nom de votre entreprise"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Poste
                      </label>
                      <Input
                        value={formData.position}
                        onChange={(e) => handleInputChange("position", e.target.value)}
                        placeholder="Votre fonction"
                      />
                    </div>
                  </div>
                </div>

                {/* Project Information */}
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-primary" />
                    Informations Projet
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Service souhaité *
                      </label>
                      <Select onValueChange={(value) => handleInputChange("service", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un service" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service} value={service}>
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Type de projet
                      </label>
                      <Select onValueChange={(value) => handleInputChange("projectType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un type" />
                        </SelectTrigger>
                        <SelectContent>
                          {projectTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Délai souhaité
                      </label>
                      <Input
                        value={formData.timeline}
                        onChange={(e) => handleInputChange("timeline", e.target.value)}
                        placeholder="Ex: 3 mois, Q2 2024..."
                      />
                    </div>
                  </div>
                </div>

                {/* Project Description */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Description du projet *
                  </label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Décrivez votre projet, vos objectifs et vos enjeux..."
                    rows={4}
                    required
                  />
                </div>


                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="flex-1 group"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Envoyer ma demande
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                  <Button variant="outline" size="lg" type="button">
                    <Calendar className="mr-2 h-4 w-4" />
                    Planifier un appel
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground text-center">
                  En soumettant ce formulaire, vous acceptez notre politique de confidentialité. 
                  Nous nous engageons à vous recontacter sous 24h.
                </p>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
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
              Pourquoi Choisir FTR Services ?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Découvrez les avantages de travailler avec notre équipe d'experts
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: CheckCircle,
                title: "Expertise Reconnue",
                description: "15+ ans d'expérience dans le secteur bancaire avec une expertise reconnue par nos clients."
              },
              {
                icon: Clock,
                title: "Réactivité",
                description: "Réponse sous 24h et démarrage rapide de vos projets avec notre équipe dédiée."
              },
              {
                icon: MessageCircle,
                title: "Accompagnement Personnalisé",
                description: "Un interlocuteur dédié et un suivi personnalisé tout au long de votre projet."
              }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                variants={springPop}
                whileHover="hover"
                className="group"
              >
                <Card className="h-full border-0 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:border-primary/20">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                      <benefit.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
