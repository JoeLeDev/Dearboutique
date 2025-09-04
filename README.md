# Dear Boutique - Système de Réservation

Une page de réservation moderne et élégante pour la bijouterie Dear Boutique, développée avec Next.js et Tailwind CSS.

## 🚀 Fonctionnalités

- **Calendrier interactif** avec sélection de créneaux horaires
- **Formulaire de contact** avec validation
- **Design responsive** adapté à tous les écrans
- **Interface moderne** inspirée du design de Dear Boutique
- **Gestion des rendez-vous** en temps réel
- **API intégrée** pour l'envoi d'emails

## 🛠️ Technologies utilisées

- **Next.js 14** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS
- **FullCalendar** - Composant calendrier
- **React Hook Form** - Gestion des formulaires
- **Yup** - Validation des données
- **Lucide React** - Icônes

## 📦 Installation

```bash
# Cloner le projet
git clone [url-du-repo]
cd dearboutique-rdv

# Installer les dépendances
npm install

# Lancer en développement
npm run dev
```

## ⚙️ Configuration

### Variables d'environnement

Créer un fichier `.env.local` :

```env
# Email configuration (optionnel)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-password

# API Keys (optionnel)
SENDGRID_API_KEY=your-sendgrid-key
```

### Personnalisation

- **Couleurs** : Modifier `tailwind.config.ts`
- **Horaires** : Ajuster dans `Calendar.tsx`
- **Services** : Modifier la liste dans `ContactForm.tsx`

## 📱 Responsive Design

- **Mobile** : Interface optimisée pour smartphones
- **Tablet** : Adaptation pour tablettes
- **Desktop** : Expérience complète sur ordinateur

## 🎨 Design System

### Couleurs principales
- **Or** : #d4af37 (couleur principale)
- **Gris** : #6b7280 (texte secondaire)
- **Blanc** : #ffffff (arrière-plan)

### Typographie
- **Police** : Inter (Google Fonts)
- **Tailles** : Responsive avec Tailwind

## 📧 Intégration Email

Le système peut être intégré avec :

- **Nodemailer** (SMTP)
- **SendGrid** (API)
- **Resend** (API moderne)
- **EmailJS** (côté client)

## 🔧 Maintenance

### Mises à jour
```bash
npm update
```

### Build de production
```bash
npm run build
```

### Tests
```bash
npm run test
```

## 📞 Support

Pour toute question ou support technique, contactez le développeur.

## 📄 Licence

Projet développé pour Dear Boutique - Tous droits réservés.