# Configuration de l'envoi d'emails pour les candidatures

## Configuration requise

Pour que le formulaire de candidature spontanée fonctionne, vous devez configurer les variables d'environnement suivantes :

### 1. Créer un fichier .env.local

Créez un fichier `.env.local` à la racine du projet avec le contenu suivant :

```env
# Configuration email pour l'envoi de candidatures
EMAIL_PASSWORD=votre_mot_de_passe_application_gmail
```

### 2. Configurer Gmail pour l'envoi d'emails

#### Option A : Mot de passe d'application (Recommandé)

1. Activez l'authentification à deux facteurs sur votre compte Gmail
2. Allez dans les paramètres de votre compte Google
3. Sélectionnez "Sécurité" > "Mots de passe des applications"
4. Générez un nouveau mot de passe d'application pour "Mail"
5. Utilisez ce mot de passe dans la variable `EMAIL_PASSWORD`

#### Option B : Configuration SMTP personnalisée

Si vous préférez utiliser un autre service email, modifiez la configuration dans `src/app/api/send-application/route.ts` :

```typescript
const transporter = nodemailer.createTransporter({
  host: 'votre-serveur-smtp.com',
  port: 587,
  secure: false,
  auth: {
    user: 'votre-email@exemple.com',
    pass: process.env.EMAIL_PASSWORD,
  },
});
```

### 3. Test de la configuration

Une fois la configuration terminée :

1. Redémarrez le serveur de développement : `npm run dev`
2. Allez sur la page Carrières : `http://localhost:3000/careers`
3. Remplissez le formulaire de candidature spontanée
4. Vérifiez que l'email est bien envoyé à `edsanas11@gmail.com`

### 4. Déploiement en production

Pour le déploiement sur Vercel :

1. Allez dans les paramètres de votre projet Vercel
2. Ajoutez la variable d'environnement `EMAIL_PASSWORD` avec votre mot de passe d'application Gmail
3. Redéployez votre site

## Fonctionnalités

- ✅ Envoi direct depuis le site (pas d'ouverture du client email)
- ✅ Pièces jointes (CV) incluses dans l'email
- ✅ Message de confirmation pour l'utilisateur
- ✅ Gestion des erreurs avec messages d'erreur appropriés
- ✅ Interface utilisateur intuitive

## Sécurité

- Le mot de passe d'application est stocké de manière sécurisée dans les variables d'environnement
- Les données du formulaire sont validées côté serveur
- Les fichiers uploadés sont traités de manière sécurisée

