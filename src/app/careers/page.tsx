"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  MapPin, 
  Clock, 
  Briefcase,
  CheckCircle,
  ArrowRight,
  Upload,
  FileText,
  Mail,
  Phone,
  Calendar,
  Award,
  TrendingUp,
  Heart,
  Lightbulb
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { fadeInUp, staggerContainer, springPop } from "@/lib/animations";
import { toast } from "sonner";


const benefits = [
  {
    icon: TrendingUp,
    title: "Évolution de Carrière",
    description: "Opportunités d'évolution et de développement professionnel dans un secteur en pleine croissance."
  },
  {
    icon: Award,
    title: "Formation Continue",
    description: "Accès à des formations certifiantes et à des conférences pour développer vos compétences."
  },
  {
    icon: Heart,
    title: "Contact Direct avec Client",
    description: "Interactions directes avec les clients, participation aux comités de pilotage et visibilité sur les décisions stratégiques."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Participation à des projets innovants avec les dernières technologies du secteur bancaire."
  }
];

// Interface pour les offres d'emploi
interface JobOffer {
  id: string;
  title: string;
  location: string;
  type: string;
  department: string;
  summary: string;
  requirements: string[];
  missions: string[];
  applyEmail: string;
  published: boolean;
  order: number;
}

const testimonials = [
  {
    name: "Sarah Chen",
    position: "Consultante Senior",
    experience: "3 ans chez Partenaire Services",
    quote: "Partenaire Services m'a offert l'opportunité de travailler sur des projets passionnants et de développer mes compétences dans un environnement stimulant.",
    avatar: "/team/sarah-chen.jpg"
  },
  {
    name: "Thomas Dubois",
    position: "Consultant Organisation",
    experience: "2 ans chez Partenaire Services",
    quote: "L'accompagnement et la formation continue permettent une évolution rapide et une expertise reconnue dans le secteur.",
    avatar: "/team/thomas-dubois.jpg"
  }
];

export default function CareersPage() {
  const [openPositions, setOpenPositions] = useState<JobOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPosition, setSelectedPosition] = useState<JobOffer | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    motivation: "",
    cv: null as File | null
  });

  // Charger les offres d'emploi depuis l'API
  useEffect(() => {
    const loadJobs = async () => {
      try {
        const response = await fetch('/api/jobs');
        const data = await response.json();
        setOpenPositions(data.jobs || []);
      } catch (error) {
        console.error('Erreur lors du chargement des offres:', error);
        // En cas d'erreur, utiliser des données par défaut
        setOpenPositions([]);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, cv: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation des formats
    if (!validateEmail(formData.email)) {
      toast.error("Veuillez entrer une adresse email valide");
      return;
    }
    
    if (formData.phone && !validatePhone(formData.phone)) {
      toast.error("Veuillez entrer un numéro de téléphone valide (format français)");
      return;
    }
    
    try {
      // Créer FormData pour l'envoi
      const formDataToSend = new FormData();
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('position', formData.position);
      formDataToSend.append('experience', formData.experience);
      formDataToSend.append('motivation', formData.motivation);
      
      if (formData.cv) {
        formDataToSend.append('cv', formData.cv);
      }
      
      // Envoyer à l'API route
      const response = await fetch('/api/send-application', {
        method: 'POST',
        body: formDataToSend,
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast.success("Candidature envoyée avec succès ! Nous vous recontacterons sous 48h.");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          position: "",
          experience: "",
          motivation: "",
          cv: null
        });
      } else {
        toast.error("Erreur lors de l'envoi de la candidature. Veuillez réessayer.");
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast.error("Erreur lors de l'envoi de la candidature. Veuillez réessayer.");
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
              <Users className="h-4 w-4 mr-2" />
              Carrières
            </motion.div>
            
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance"
            >
              Rejoignez Notre{" "}
              <span className="text-primary">Équipe d'Experts</span>
            </motion.h1>
            
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-300 mb-8 leading-relaxed"
            >
              Participez à des projets passionnants dans le secteur bancaire et 
              développez votre expertise dans un environnement stimulant et innovant.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
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
              Pourquoi Rejoindre Partenaire Services ?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Découvrez les avantages et opportunités qui vous attendent
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {benefits.map((benefit, index) => (
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

      {/* Open Positions */}
      <section className="section-padding bg-[#F7F8FA]">
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
              Offres d'Emploi
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Découvrez nos postes ouverts et trouvez celui qui correspond à votre profil
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {loading ? (
              <div className="col-span-full text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p className="mt-4 text-muted-foreground">Chargement des offres...</p>
              </div>
            ) : openPositions.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <Briefcase className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Aucune offre disponible</h3>
                <p className="text-muted-foreground">Revenez bientôt pour découvrir nos nouvelles opportunités</p>
              </div>
            ) : (
              openPositions.map((position, index) => (
                <motion.div
                  key={position.id}
                  variants={springPop}
                  whileHover="hover"
                  className="group cursor-pointer"
                  onClick={() => setSelectedPosition(position)}
                >
                  <Card className="h-full border-0 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:border-primary/20">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <CardTitle className="text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                            {position.title}
                          </CardTitle>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {position.location}
                            </span>
                            <span className="flex items-center">
                              <Briefcase className="h-4 w-4 mr-1" />
                              {position.type}
                            </span>
                            <span className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              {position.department}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {position.summary}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {position.requirements.slice(0, 3).map((req, reqIndex) => (
                          <Badge key={reqIndex} variant="secondary" className="text-xs">
                            {req}
                          </Badge>
                        ))}
                        {position.requirements.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{position.requirements.length - 3} autres
                          </Badge>
                        )}
                      </div>
                      
                      <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        Voir le détail
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
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
              Témoignages de Nos Collaborateurs
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                variants={springPop}
                className="group"
              >
                <Card className="h-full border-0 shadow-sm">
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-bold text-lg">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {testimonial.name}
                        </h3>
                        <p className="text-primary font-medium text-sm">
                          {testimonial.position}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {testimonial.experience}
                        </p>
                      </div>
                    </div>
                    <blockquote className="text-muted-foreground italic leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Candidature Spontanée */}
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
                Candidature Spontanée
              </h2>
              <p className="text-xl text-muted-foreground">
                Vous ne trouvez pas le poste qui vous correspond ? Envoyez-nous votre candidature spontanée !
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Poste recherché *
                    </label>
                    <Select onValueChange={(value) => handleInputChange("position", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un poste" />
                      </SelectTrigger>
                      <SelectContent>
                        {openPositions.map((job) => (
                          <SelectItem key={job.id} value={job.title}>
                            {job.title}
                          </SelectItem>
                        ))}
                        <SelectItem value="autre">Autre poste</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Années d'expérience *
                    </label>
                    <Select onValueChange={(value) => handleInputChange("experience", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez votre expérience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-2">0-2 ans</SelectItem>
                        <SelectItem value="3-5">3-5 ans</SelectItem>
                        <SelectItem value="6-10">6-10 ans</SelectItem>
                        <SelectItem value="10+">10+ ans</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>


                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    CV (PDF) *
                  </label>
                  <div className="flex items-center space-x-4">
                    <Input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                      required
                    />
                    <Upload className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full group">
                  <Mail className="mr-2 h-4 w-4" />
                  Envoyer ma candidature
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Position Detail Modal */}
      <AnimatePresence>
        {selectedPosition && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedPosition(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    {selectedPosition.title}
                  </h2>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {selectedPosition.location}
                    </span>
                    <span className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-1" />
                      {selectedPosition.type}
                    </span>
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {selectedPosition.department}
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedPosition(null)}
                >
                  ×
                </Button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Description</h3>
                  <p className="text-muted-foreground">{selectedPosition.summary}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Profil recherché</h3>
                  <ul className="space-y-2">
                    {selectedPosition.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-primary mr-3 mt-0.5 flex-shrink-0" />
                        {requirement}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Missions</h3>
                  <ul className="space-y-2">
                    {selectedPosition.missions.map((mission, index) => (
                      <li key={index} className="flex items-start text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-primary mr-3 mt-0.5 flex-shrink-0" />
                        {mission}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Postuler à ce poste</h3>
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const email = formData.get('email') as string;
                    const phone = formData.get('phone') as string;
                    
                    // Validation des formats
                    if (!validateEmail(email)) {
                      toast.error("Veuillez entrer une adresse email valide");
                      return;
                    }
                    
                    if (phone && !validatePhone(phone)) {
                      toast.error("Veuillez entrer un numéro de téléphone valide (format français)");
                      return;
                    }
                    
                    formData.append('jobTitle', selectedPosition.title);
                    formData.append('applyEmail', selectedPosition.applyEmail);
                    
                    try {
                      const response = await fetch('/api/upload-cv', {
                        method: 'POST',
                        body: formData,
                      });
                      
                      if (response.ok) {
                        toast.success("Candidature envoyée avec succès !");
                        setSelectedPosition(null);
                      } else {
                        toast.error("Erreur lors de l'envoi de la candidature");
                      }
                    } catch (error) {
                      toast.error("Erreur lors de l'envoi de la candidature");
                    }
                  }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Nom *
                        </label>
                        <Input
                          name="lastName"
                          required
                          placeholder="Votre nom"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Prénom *
                        </label>
                        <Input
                          name="firstName"
                          required
                          placeholder="Votre prénom"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Email *
                        </label>
                        <Input
                          name="email"
                          type="email"
                          required
                          placeholder="votre@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Téléphone
                        </label>
                        <Input
                          name="phone"
                          type="tel"
                          placeholder="+33 1 23 45 67 89"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-foreground mb-2">
                        CV (PDF) *
                      </label>
                      <Input
                        name="cv"
                        type="file"
                        accept=".pdf"
                        required
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                      />
                    </div>
                    
                    <div className="flex space-x-4">
                      <Button type="submit" className="flex-1">
                        <Mail className="mr-2 h-4 w-4" />
                        Envoyer ma candidature
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setSelectedPosition(null)}>
                        <FileText className="mr-2 h-4 w-4" />
                        Fermer
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
