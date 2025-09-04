# Guide de Déploiement - Dear Boutique

## 🚀 Déploiement sur Vercel (Recommandé)

### Étape 1 : Préparation
1. Créer un compte sur [Vercel](https://vercel.com)
2. Connecter votre compte GitHub à Vercel

### Étape 2 : Déploiement
1. **Import du projet** :
   - Cliquer sur "New Project" dans Vercel
   - Sélectionner le repository GitHub
   - Vercel détectera automatiquement Next.js

2. **Configuration** :
   - **Framework Preset** : Next.js
   - **Root Directory** : `./` (par défaut)
   - **Build Command** : `npm run build`
   - **Output Directory** : `.next` (par défaut)

3. **Variables d'environnement** (optionnel) :
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=votre-email@gmail.com
   SMTP_PASS=votre-mot-de-passe
   ```

4. **Déploiement** :
   - Cliquer sur "Deploy"
   - Attendre la fin du build (2-3 minutes)

### Étape 3 : Configuration du domaine
1. **Domaine personnalisé** :
   - Aller dans "Settings" > "Domains"
   - Ajouter `rendez-vous.dearboutique.com`
   - Suivre les instructions DNS

2. **SSL automatique** :
   - Vercel configure automatiquement HTTPS
   - Certificat renouvelé automatiquement

## 🌐 Autres options d'hébergement

### Netlify
```bash
# Build du projet
npm run build

# Déploiement via drag & drop
# Glisser le dossier .next vers Netlify
```

### Firebase Hosting
```bash
# Installation de Firebase CLI
npm install -g firebase-tools

# Initialisation
firebase init hosting

# Build et déploiement
npm run build
firebase deploy
```

## 📧 Configuration Email

### Option 1 : EmailJS (Gratuit)
1. Créer un compte sur [EmailJS](https://www.emailjs.com)
2. Configurer un service email (Gmail, Outlook, etc.)
3. Récupérer les clés API
4. Modifier le composant ContactForm

### Option 2 : Nodemailer + SMTP
1. Configurer un compte SMTP (Gmail, SendGrid, etc.)
2. Ajouter les variables d'environnement
3. Modifier l'API route `/api/send-email`

### Option 3 : SendGrid
1. Créer un compte [SendGrid](https://sendgrid.com)
2. Générer une clé API
3. Configurer les variables d'environnement

## 🔧 Maintenance

### Mises à jour
```bash
# Mise à jour des dépendances
npm update

# Rebuild et redéploiement
npm run build
```

### Monitoring
- **Vercel Analytics** : Activé par défaut
- **Logs** : Disponibles dans le dashboard Vercel
- **Performance** : Monitoring automatique

## 📱 Intégration avec le site principal

### Ajout du lien
Ajouter sur le site Shopify principal :
```html
<a href="https://rendez-vous.dearboutique.com" 
   class="btn btn-primary">
   Prendre rendez-vous
</a>
```

### Personnalisation
- Modifier les couleurs dans `tailwind.config.ts`
- Ajuster les horaires dans `Calendar.tsx`
- Personnaliser les services dans `ContactForm.tsx`

## 🆘 Support

En cas de problème :
1. Vérifier les logs dans Vercel
2. Tester en local avec `npm run dev`
3. Contacter le développeur

## 💰 Coûts

- **Vercel** : Gratuit jusqu'à 100GB/mois
- **Domaine** : ~10€/an (optionnel)
- **Email** : Gratuit avec EmailJS ou ~5€/mois avec SendGrid

**Total mensuel** : 0€ (avec plan gratuit)
