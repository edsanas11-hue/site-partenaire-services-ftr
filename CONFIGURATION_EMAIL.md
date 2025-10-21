# Configuration de l'envoi d'emails pour les candidatures

## 📧 Configuration requise

Pour que le formulaire de candidature spontanée fonctionne, vous devez configurer votre mot de passe d'application Gmail.

## 🔧 Étapes de configuration

### 1. Activer l'authentification à deux facteurs
- Allez sur votre compte Google
- Sélectionnez "Sécurité" dans le menu
- Activez l'authentification à deux facteurs si ce n'est pas déjà fait

### 2. Générer un mot de passe d'application
1. Allez dans les paramètres de votre compte Google
2. Sélectionnez "Sécurité" > "Mots de passe des applications"
3. Sélectionnez "Mail" comme application
4. Générez un nouveau mot de passe d'application
5. **Copiez ce mot de passe** (il ne sera affiché qu'une seule fois)

### 3. Configurer le fichier .env.local
Remplacez `votre_mot_de_passe_application_gmail` dans le fichier `.env.local` par le mot de passe d'application que vous venez de générer :

```env
EMAIL_PASSWORD=votre_mot_de_passe_application_gmail_ici
```

### 4. Redémarrer le serveur
Après avoir modifié le fichier `.env.local`, redémarrez le serveur de développement :

```bash
# Arrêter le serveur (Ctrl+C)
# Puis relancer
npm run dev
```

## ✅ Test
Une fois configuré, le formulaire de candidature spontanée enverra directement l'email à `edsanas11@gmail.com` sans ouvrir votre application mail.

## 🔒 Sécurité
- Ne partagez jamais votre mot de passe d'application
- Le fichier `.env.local` est déjà dans `.gitignore` pour éviter qu'il soit partagé
- Vous pouvez révoquer le mot de passe d'application à tout moment depuis votre compte Google

