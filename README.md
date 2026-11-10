# Collège Sainte Trinité Kara (CST-K) — Site vitrine (Frontend)

Déclinaison du modèle pour le **Collège Sainte Trinité Kara**, établissement confessionnel
catholique du Diocèse de Kara, quartier Soumbou / Tomdè, route du CHR de Tomdè — tél. +228 90 09 97 97.

Vue 3 · Vite · TypeScript · vue-router. Site public (accueil, cycles, admissions, tarifs,
actualités, médias, préinscription, rendez-vous) et espace d'administration.

Ce projet **fonctionne seul** grâce à des données fictives (*fake data*), et se
**reconnecte au backend** (projet backend de l’établissement) en changeant une seule variable.

## Démarrage (présentation, sans backend)

```bash
npm install
npm run dev          # http://127.0.0.1:5173
```

- Site : http://127.0.0.1:5173
- Administration : http://127.0.0.1:5173/admin/connexion
  Compte de démonstration : `direction@saintetrinite-kara.tg` / `TriniteDemo2026!`
  (un bouton de la page de connexion remplit les champs).

Tout fonctionne en démonstration : formulaires avec référence `PRE-…`, `VIS-…`, `MSG-…`,
gestion des actualités / événements / galerie (téléversement compris), statuts des
demandes, paramètres, utilisateurs. Les modifications sont gardées dans le navigateur
(localStorage) ; le bouton **« Réinitialiser les données »** de la page de connexion
restaure la démo d'origine.

Version compilée pour une présentation hors ligne ou un hébergement statique :

```bash
npm run build        # génère dist/
npm run preview      # http://127.0.0.1:4173
```

Pour un hébergeur statique (Netlify, Vercel, Nginx…), redirigez toutes les routes
inconnues vers `index.html` (application monopage).

## Les deux sources de données

| Variable | Valeur | Effet |
|---|---|---|
| `VITE_DATA_SOURCE` | `mock` (défaut) | fake data dans le navigateur, aucun serveur |
| | `api` | backend Node.js réel |
| `VITE_API_URL` | `/api` (défaut) | API sur le même domaine (proxy Vite en développement) |
| | `https://api.ecole.tg/api` | API sur un autre domaine |
| `VITE_MOCK_LATENCY` | `250` (défaut) | délai simulé des fake data, en ms |

Raccourcis : `npm run dev:api` et `npm run build:api` (fichier `.env.api`).
Voir [docs/CONNEXION-BACKEND.md](docs/CONNEXION-BACKEND.md) pour reconnecter le backend.

## Architecture

```
src/
├── config/
│   ├── app.ts          source de données, URL de l'API (variables VITE_*)
│   └── school.ts       PROFIL DE L'ÉTABLISSEMENT : identité, textes, cycles, FAQ…
├── models/index.ts     types des données = format JSON exact de l'API
├── services/
│   ├── contracts.ts    interfaces des services (une méthode = une route de l'API)
│   ├── index.ts        choisit l'implémentation : `services.content.list(...)` etc.
│   ├── api/            implémentation HTTP (backend réel, cookies + CSRF)
│   ├── mock/           implémentation fake data (mêmes règles que le backend)
│   └── errors.ts       ApiError commune aux deux implémentations
├── mocks/
│   ├── data.ts         FAKE DATA (actualités, événements, galerie, demandes, comptes)
│   ├── db.ts           stockage en mémoire + localStorage, réinitialisation
│   └── validation.ts   validation identique au backend (mêmes messages)
├── stores/             état partagé : administrateur connecté, paramètres de l'école
├── utils/format.ts     montants, dates, libellés de statut, URL des images
├── components/ layouts/ views/   interface (n'utilise QUE `services`)
└── router.ts
```

Règle d'or : **les vues n'appellent jamais `fetch` ni les fake data directement**, elles
passent par `services`. Les deux implémentations respectent les mêmes contrats et
renvoient les mêmes formes de données (`src/models`), avec les mêmes erreurs
(`ApiError` : `message` + `errors` par champ). Changer de source ne touche aucune vue.

## Décliner le site pour un autre établissement

1. Dupliquez ce dossier.
2. Modifiez **`src/config/school.ts`** : nom, slogan, coordonnées, tarifs, textes de
   l'accueil (héros, mot du fondateur, histoire, valeurs, FAQ), cycles et classes,
   documents d'admission. Changez aussi `id` (clé de stockage des fake data).
3. Remplacez les images de `public/` : `sainte-trinite-logo.png` (ou changez `logo`), `hero/`,
   `directeur-general.jpg`, `media/`.
4. Adaptez `index.html` (titre, description, `theme-color`) et, si besoin, les couleurs
   dans `src/styles.css` (variables `--blue`, `--green`, `--yellow`, `--red` en tête de fichier).
5. Si vous voulez d'autres fake data (actualités, événements…), modifiez `src/mocks/data.ts`.

Le backend accepte les cycles Maternelle / Primaire / Collège et leurs classes
(`backend/src/utils/schemas.js`). Si un établissement a d'autres cycles ou classes,
mettez les deux fichiers à jour ensemble.

## Tests

```bash
npx playwright install chromium   # une fois
PLAYWRIGHT_CHROMIUM=1 npm run test   # sur les fake data, sans backend
E2E_API=1 PLAYWRIGHT_CHROMIUM=1 npm run test   # avec le backend démarré sur le port 8080
```

Deux scénarios (deux navigateurs partageant les données, panne réseau) ne tournent
qu'avec le backend.

## Spécificités de ce site

- **Un seul cycle** : Collège (6e, 5e, 4e, 3e), préparation au BEPC. Le menu « Nos cycles »
  devient « Nos classes ».
- **Nom court dans la barre de navigation** (`shortName` : « Collège Sainte Trinité ») ; le nom
  complet reste dans le pied de page.
- **Boutons flottants WhatsApp et Appeler** (en bas à gauche) et lien WhatsApp dans le pied de
  page : ils utilisent le téléphone principal des paramètres (`phone`), donc +228 90 09 97 97.
- Tenues (bleu / kaki, Lacoste blanc bordé d’orange) décrites dans la FAQ et la page Tarifs.

## Contenu Collège Sainte Trinité

Informations vérifiées (fournies + site officiel saintetrinite-kara-togo.com, page Historique) :
nom, statut catholique (Diocèse de Kara), téléphone, quartier et repère, classes, BEPC,
tenues, ouverture en 2021 (1re promotion de 6e le 27 septembre 2021, 42 élèves), 102 élèves
en 2022-2023, 158 en 2023-2024, fin des travaux en janvier 2024, cycle complet en 2024-2025,
devise « Pour Dieu et la Patrie ».

**Données fictives à remplacer** dès que l'établissement les communique :

- E-mail (`contact@saintetrinite-kara.tg`), horaires.
- Tous les tarifs (scolarité 90 000 F, cantine, badge, Lacoste, APE) — page Tarifs.
- Textes « Mot du directeur » (nom du directeur non connu) et photo provisoire.
- Logo : `public/sainte-trinite-logo.png` est un logo provisoire aux couleurs du site
  (à remplacer par le logo officiel de la Trinité fourni par le collège).
- Photos `public/hero/` et `public/media/` : photos génériques du modèle.
- Actualités, événements et demandes de démonstration (`src/mocks/data.ts`).
- Le site officiel indique aussi un WhatsApp au +228 92 92 08 93 : à vérifier avec le collège.
