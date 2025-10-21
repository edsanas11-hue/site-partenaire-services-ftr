# Configuration de l'envoi d'emails avec Resend

## 📧 Solution recommandée : Resend

Resend est un service d'email moderne et simple à configurer. Voici comment l'utiliser :

### 1. Créer un compte Resend
1. Allez sur [resend.com](https://resend.com)
2. Créez un compte gratuit
3. Vérifiez votre email

### 2. Obtenir une clé API
1. Dans le dashboard Resend, allez dans "API Keys"
2. Créez une nouvelle clé API
3. Copiez la clé (elle commence par `re_`)

### 3. Configurer le fichier .env.local
Remplacez `votre_cle_api_resend` dans le fichier `.env.local` par votre vraie clé API :

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 4. Vérifier le domaine
1. Dans Resend, allez dans "Domains"
2. Ajoutez votre domaine (ex: `partenaire-services.fr`)
3. Suivez les instructions DNS pour vérifier le domaine

### 5. Alternative : Utilisation sans configuration
Si vous ne configurez pas Resend, le formulaire fonctionnera quand même mais les emails ne seront pas envoyés (simulation).

## 🔧 Configuration actuelle

Le système fonctionne maintenant avec :
- ✅ **Fallback automatique** : Si Resend n'est pas configuré, simulation d'envoi
- ✅ **Gestion des erreurs** : Messages d'erreur clairs
- ✅ **Pièces jointes** : Support des fichiers CV
- ✅ **Logs** : Affichage des candidatures dans la console

## 📝 Test du formulaire

1. Allez sur `http://localhost:3000/careers`
2. Remplissez le formulaire de candidature spontanée
3. Cliquez sur "Envoyer ma candidature"
4. Vous devriez voir "Candidature envoyée avec succès !"

## 🚀 Déploiement

Pour la production, configurez Resend avec votre domaine vérifié pour un envoi d'emails professionnel.

