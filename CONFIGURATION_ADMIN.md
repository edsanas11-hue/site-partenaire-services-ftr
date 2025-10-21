# Configuration de l'interface d'administration

## 🔐 Configuration requise

Pour utiliser l'interface d'administration des offres d'emploi, vous devez configurer les variables d'environnement suivantes dans votre fichier `.env.local` :

### Variables d'environnement

```env
# Configuration Admin
ADMIN_PASSWORD=ps-admin-2025
ADMIN_TOKEN=ps-token-2025

# Configuration Vercel Blob (pour le stockage des offres d'emploi)
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## 🚀 Accès à l'administration

### URL d'accès
- **URL locale** : `http://localhost:3000/admin/jobs`
- **URL production** : `https://votre-domaine.com/admin/jobs`

### Authentification
- **Mot de passe par défaut** : `ps-admin-2025`
- **Token admin par défaut** : `ps-token-2025`

## 📝 Fonctionnalités disponibles

### Gestion des offres d'emploi
- ✅ Créer de nouvelles offres
- ✅ Modifier les offres existantes
- ✅ Supprimer des offres
- ✅ Publier/Dépublier des offres
- ✅ Gérer l'ordre d'affichage
- ✅ Recherche et filtres

### Champs des offres
- **Titre** : Titre du poste
- **Lieu** : Localisation du poste
- **Type** : Type de contrat (CDI, CDD, Freelance, etc.)
- **Département** : Département de l'entreprise
- **Résumé** : Description courte du poste
- **Exigences** : Liste des exigences (ajout dynamique)
- **Missions** : Liste des missions (ajout dynamique)
- **Email de candidature** : Email pour postuler
- **Statut de publication** : Publié/Non publié
- **Ordre d'affichage** : Numéro pour trier les offres

## 🔧 Configuration Vercel Blob (Production)

### 1. Installer Vercel Blob
```bash
npm install @vercel/blob
```

### 2. Obtenir le token
- Allez sur [vercel.com](https://vercel.com)
- Connectez-vous à votre compte
- Allez dans "Settings" > "Tokens"
- Créez un nouveau token avec les permissions "Blob"
- Copiez le token

### 3. Configurer la variable d'environnement
```env
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 4. Déployer sur Vercel
```bash
npx vercel --prod
```

## 🛡️ Sécurité

### Protection de l'accès
- L'interface admin n'est pas listée dans la navigation publique
- Protection par mot de passe côté serveur
- Token d'authentification requis pour les API
- Meta robots "noindex,nofollow" pour éviter l'indexation

### Bonnes pratiques
- Changez les mots de passe par défaut en production
- Utilisez des tokens forts et uniques
- Limitez l'accès à l'interface admin aux personnes autorisées

## 📊 Stockage des données

### Développement
- Les données sont stockées dans `/data/jobs.json`
- Création automatique du dossier si nécessaire

### Production
- Utilisation de Vercel Blob pour le stockage
- Fallback vers le stockage local si Vercel Blob n'est pas configuré

## 🔄 Synchronisation

Les offres d'emploi sont automatiquement synchronisées entre :
- L'interface d'administration (`/admin/jobs`)
- La page Carrières publique (`/careers`)
- L'API publique (`/api/jobs`)

## 🚨 Dépannage

### Problèmes courants

1. **Erreur 401 - Non autorisé**
   - Vérifiez que le mot de passe est correct
   - Vérifiez que le token admin est configuré

2. **Erreur de sauvegarde**
   - Vérifiez la configuration Vercel Blob
   - Vérifiez les permissions d'écriture

3. **Offres non visibles**
   - Vérifiez que les offres sont publiées
   - Vérifiez l'ordre d'affichage

### Logs
Les erreurs sont loggées dans la console du serveur pour le débogage.

