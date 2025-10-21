# Interface d'Administration - Partenaire Services

## 🎯 Vue d'ensemble

L'interface d'administration permet de gérer facilement les offres d'emploi du site Partenaire Services sans intervention technique. Elle est accessible uniquement aux administrateurs autorisés.

## 🔐 Accès à l'administration

### URL d'accès
- **Local** : `http://localhost:3000/admin/jobs`
- **Production** : `https://partenaire-services.vercel.app/admin/jobs`

### Authentification
- **Mot de passe par défaut** : `ps-admin-2025`
- **Token admin** : `ps-token-2025`

> ⚠️ **Important** : Changez ces valeurs par défaut en production !

## 📋 Fonctionnalités disponibles

### ✅ Gestion des offres d'emploi
- **Créer** de nouvelles offres d'emploi
- **Modifier** les offres existantes
- **Supprimer** des offres
- **Publier/Dépublier** des offres
- **Réorganiser** l'ordre d'affichage
- **Rechercher** et filtrer les offres

### 🔍 Recherche et filtres
- **Recherche par titre** ou lieu
- **Filtre par statut** : Publiées / Non publiées
- **Filtre par département**
- **Tri par ordre** d'affichage

## 📝 Champs des offres d'emploi

### Informations de base
- **Titre** : Titre du poste (obligatoire)
- **Lieu** : Localisation du poste (obligatoire)
- **Type** : Type de contrat (CDI, CDD, Freelance, etc.) (obligatoire)
- **Département** : Département de l'entreprise (obligatoire)

### Contenu
- **Résumé** : Description courte du poste (obligatoire)
- **Exigences** : Liste des exigences (ajout dynamique, minimum 1)
- **Missions** : Liste des missions (ajout dynamique, minimum 1)

### Configuration
- **Email de candidature** : Email pour postuler (obligatoire, format valide)
- **Statut de publication** : Publié/Non publié
- **Ordre d'affichage** : Numéro pour trier les offres

## 🚀 Guide d'utilisation

### 1. Se connecter
1. Accédez à `/admin/jobs`
2. Entrez le mot de passe admin
3. Cliquez sur "Se connecter"

### 2. Créer une nouvelle offre
1. Cliquez sur "Nouvelle offre"
2. Remplissez tous les champs obligatoires
3. Ajoutez des exigences et missions (bouton "+")
4. Cochez "Publier immédiatement" si souhaité
5. Cliquez sur "Créer"

### 3. Modifier une offre existante
1. Cliquez sur l'icône "Éditer" (crayon) dans le tableau
2. Modifiez les champs souhaités
3. Cliquez sur "Mettre à jour"

### 4. Publier/Dépublier une offre
1. Cliquez sur le badge de statut dans le tableau
2. L'offre change de statut immédiatement

### 5. Supprimer une offre
1. Cliquez sur l'icône "Supprimer" (poubelle) dans le tableau
2. Confirmez la suppression

### 6. Réorganiser les offres
1. Modifiez le champ "Ordre" dans le tableau
2. Les offres sont triées automatiquement

## 🔧 Configuration technique

### Variables d'environnement
```env
# Configuration Admin
ADMIN_PASSWORD=ps-admin-2025
ADMIN_TOKEN=ps-token-2025

# Configuration Vercel Blob (Production)
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Stockage des données
- **Développement** : Fichier JSON local (`/data/jobs.json`)
- **Production** : Vercel Blob (cloud)

## 🛡️ Sécurité

### Protection de l'accès
- ✅ Interface non listée dans la navigation publique
- ✅ Protection par mot de passe côté serveur
- ✅ Token d'authentification requis pour les API
- ✅ Meta robots "noindex,nofollow" pour éviter l'indexation

### Bonnes pratiques
- 🔒 Changez les mots de passe par défaut en production
- 🔒 Utilisez des tokens forts et uniques
- 🔒 Limitez l'accès aux personnes autorisées
- 🔒 Sauvegardez régulièrement les données

## 📊 Synchronisation automatique

Les offres d'emploi sont automatiquement synchronisées entre :
- **Interface d'administration** (`/admin/jobs`)
- **Page Carrières publique** (`/careers`)
- **API publique** (`/api/jobs`)

### Règles de publication
- Seules les offres avec `published: true` apparaissent sur le site public
- L'ordre d'affichage est déterminé par le champ `order`
- Les offres non publiées restent visibles dans l'admin

## 🚨 Dépannage

### Problèmes courants

#### 1. Erreur 401 - Non autorisé
**Cause** : Mot de passe ou token incorrect
**Solution** : Vérifiez les variables d'environnement

#### 2. Erreur de sauvegarde
**Cause** : Problème de stockage ou permissions
**Solution** : 
- Vérifiez la configuration Vercel Blob
- Vérifiez les permissions d'écriture
- Consultez les logs du serveur

#### 3. Offres non visibles sur le site
**Cause** : Offres non publiées ou ordre incorrect
**Solution** :
- Vérifiez le statut de publication
- Vérifiez l'ordre d'affichage
- Actualisez la page

#### 4. Interface admin inaccessible
**Cause** : Problème de routage ou authentification
**Solution** :
- Vérifiez l'URL : `/admin/jobs`
- Vérifiez la configuration des routes
- Consultez les logs du serveur

### Logs et débogage
- Les erreurs sont loggées dans la console du serveur
- Utilisez les outils de développement du navigateur
- Vérifiez les requêtes réseau dans l'onglet Network

## 📞 Support

Pour toute question ou problème :
1. Consultez ce guide
2. Vérifiez les logs du serveur
3. Contactez l'équipe technique

---

**Note** : Cette interface est conçue pour être utilisée par des non-techniciens. Tous les champs sont validés automatiquement et les erreurs sont affichées clairement.

