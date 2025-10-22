"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Search, 
  Filter,
  Save,
  X,
  Check,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { JobOffer } from '@/lib/jobs-storage';

export default function AdminJobsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [adminToken, setAdminToken] = useState('');
  const [jobs, setJobs] = useState<JobOffer[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState<JobOffer | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');

  // Formulaire d'offre
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    type: '',
    department: '',
    summary: '',
    requirements: [''],
    missions: [''],
    applyEmail: '',
    published: false,
    order: 0
  });

  // Authentification
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/.netlify/functions/admin-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await response.json();
      
      if (data.success) {
        setIsAuthenticated(true);
        setAdminToken(data.token);
        toast.success('Connexion réussie');
      } else {
        toast.error(data.error || 'Erreur de connexion');
      }
    } catch (error) {
      toast.error('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  // Charger les offres
  const loadJobs = useCallback(async () => {
    try {
      const response = await fetch('/.netlify/functions/admin-jobs', {
        headers: { 'Authorization': `Bearer ${adminToken}` }
      });
      const data = await response.json();
      const jobsArr = Array.isArray(data) ? data : (data.jobs || []);
      setJobs(jobsArr);
    } catch (error) {
      toast.error('Erreur lors du chargement des offres');
    }
  }, [adminToken]);

  // Charger les offres quand l'utilisateur est authentifié
  useEffect(() => {
    if (isAuthenticated && adminToken) {
      loadJobs();
    }
  }, [isAuthenticated, adminToken, loadJobs]);

  // Sauvegarder une offre
  const saveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const jobData = {
        ...formData,
        requirements: formData.requirements.filter(req => req.trim() !== ''),
        missions: formData.missions.filter(mission => mission.trim() !== ''),
        order: parseInt(formData.order.toString()) || 0
      };

      const url = '/.netlify/functions/admin-jobs';
      const method = editingJob ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify(editingJob ? { id: editingJob.id, ...jobData } : jobData)
      });

      const data = await response.json();

      // Considérer toute réponse contenant un 'id' comme succès
      if (data && data.id) {
        toast.success(editingJob ? 'Offre mise à jour' : 'Offre créée');
        setShowForm(false);
        setEditingJob(null);
        resetForm();
        loadJobs();
      } else if (data.error) {
        toast.error(data.error || 'Erreur lors de la sauvegarde');
      } else {
        toast.error('Erreur lors de la sauvegarde');
      }
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  // Supprimer une offre
  const deleteJob = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette offre ?')) return;

    try {
      const response = await fetch('/.netlify/functions/admin-jobs', {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}` 
        },
        body: JSON.stringify({ id })
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Offre supprimée');
        loadJobs();
      } else {
        toast.error(data.error || 'Erreur lors de la suppression');
      }
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  // Toggle publication
  const togglePublication = async (job: JobOffer) => {
    try {
      const response = await fetch('/.netlify/functions/admin-jobs', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify({ id: job.id, published: !job.published })
      });

      const data = await response.json();

      if (data.success) {
        toast.success(job.published ? 'Offre dépubliée' : 'Offre publiée');
        loadJobs();
      } else {
        toast.error(data.error || 'Erreur lors de la mise à jour');
      }
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  // Éditer une offre
  const editJob = (job: JobOffer) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      location: job.location,
      type: job.type,
      department: job.department,
      summary: job.summary,
      requirements: job.requirements.length > 0 ? job.requirements : [''],
      missions: job.missions.length > 0 ? job.missions : [''],
      applyEmail: job.applyEmail,
      published: job.published,
      order: job.order
    });
    setShowForm(true);
  };

  // Réinitialiser le formulaire
  const resetForm = () => {
    setFormData({
      title: '',
      location: '',
      type: '',
      department: '',
      summary: '',
      requirements: [''],
      missions: [''],
      applyEmail: '',
      published: false,
      order: 0
    });
  };

  // Annuler l'édition
  const cancelEdit = () => {
    setShowForm(false);
    setEditingJob(null);
    resetForm();
  };

  // Ajouter un champ requis/mission
  const addField = (type: 'requirements' | 'missions') => {
    setFormData(prev => ({
      ...prev,
      [type]: [...prev[type], '']
    }));
  };

  // Supprimer un champ requis/mission
  const removeField = (type: 'requirements' | 'missions', index: number) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  // Mettre à jour un champ requis/mission
  const updateField = (type: 'requirements' | 'missions', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].map((item, i) => i === index ? value : item)
    }));
  };

  // Filtrer les offres
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'published' && job.published) ||
                         (filterStatus === 'unpublished' && !job.published);
    const matchesDepartment = filterDepartment === 'all' || job.department === filterDepartment;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  // Obtenir les départements uniques
  const departments = [...new Set(jobs.map(job => job.department))];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Administration - Connexion</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Mot de passe</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Entrez le mot de passe admin"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Connexion...' : 'Se connecter'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des Offres d'Emploi</h1>
          <p className="text-gray-600">Créez, modifiez et gérez les offres d'emploi de votre site</p>
        </div>

        {/* Actions et filtres */}
        <div className="mb-6 flex flex-col lg:flex-row gap-4">
          <Button onClick={() => { setShowForm(true); setEditingJob(null); resetForm(); }} className="lg:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle offre
          </Button>
          
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher par titre ou lieu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="published">Publiées</SelectItem>
                <SelectItem value="unpublished">Non publiées</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterDepartment} onValueChange={setFilterDepartment}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Département" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les départements</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tableau des offres */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Offre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lieu</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Département</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ordre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredJobs
                  .sort((a, b) => a.order - b.order)
                  .map((job) => (
                    <tr key={job.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{job.title}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{job.summary}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{job.location}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{job.type}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{job.department}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => togglePublication(job)}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            job.published 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {job.published ? (
                            <>
                              <Eye className="w-3 h-3 mr-1" />
                              Publiée
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3 h-3 mr-1" />
                              Non publiée
                            </>
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{job.order}</td>
                      <td className="px-6 py-4 text-sm font-medium space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => editJob(job)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteJob(job.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Formulaire modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">
                    {editingJob ? 'Modifier l\'offre' : 'Nouvelle offre'}
                  </h2>
                  <Button variant="outline" onClick={cancelEdit}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <form onSubmit={saveJob} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Titre *</label>
                      <Input
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Titre du poste"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Lieu *</label>
                      <Input
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="Ville, Région"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Type de contrat *</label>
                      <Input
                        value={formData.type}
                        onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                        placeholder="CDI, CDD, Freelance..."
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Département *</label>
                      <Input
                        value={formData.department}
                        onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                        placeholder="Département"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Résumé *</label>
                    <Textarea
                      value={formData.summary}
                      onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                      placeholder="Description courte du poste"
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Exigences *</label>
                    {formData.requirements.map((req, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <Input
                          value={req}
                          onChange={(e) => updateField('requirements', index, e.target.value)}
                          placeholder={`Exigence ${index + 1}`}
                          required
                        />
                        {formData.requirements.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => removeField('requirements', index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => addField('requirements')}
                      className="mt-2"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Ajouter une exigence
                    </Button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Missions *</label>
                    {formData.missions.map((mission, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <Input
                          value={mission}
                          onChange={(e) => updateField('missions', index, e.target.value)}
                          placeholder={`Mission ${index + 1}`}
                          required
                        />
                        {formData.missions.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => removeField('missions', index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => addField('missions')}
                      className="mt-2"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Ajouter une mission
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Email de candidature *</label>
                      <Input
                        type="email"
                        value={formData.applyEmail}
                        onChange={(e) => setFormData(prev => ({ ...prev, applyEmail: e.target.value }))}
                        placeholder="candidatures@partenaire-services.fr"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Ordre d'affichage</label>
                      <Input
                        type="number"
                        value={formData.order}
                        onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="published"
                      checked={formData.published}
                      onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                      className="rounded"
                    />
                    <label htmlFor="published" className="text-sm font-medium">
                      Publier immédiatement
                    </label>
                  </div>

                  <div className="flex justify-end space-x-4 pt-4 border-t">
                    <Button type="button" variant="outline" onClick={cancelEdit}>
                      Annuler
                    </Button>
                    <Button type="submit" disabled={loading}>
                      {loading ? 'Sauvegarde...' : (editingJob ? 'Mettre à jour' : 'Créer')}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

