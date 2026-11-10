// ============================================================================
//  PROFIL DE L'ÉTABLISSEMENT
//  C'est le fichier à adapter pour décliner le site pour une autre école :
//  identité, coordonnées, tarifs par défaut, textes de l'accueil, cycles, FAQ…
//  Les images référencées se trouvent dans le dossier public/.
//
//  En mode API, les coordonnées et les tarifs (bloc `settings`) sont ensuite
//  remplacés par ceux enregistrés dans l'administration (GET /api/public/settings).
// ============================================================================
import type { Settings } from '../models'

export interface CycleProfile {
  /**
   * Valeur technique du cycle. Doit correspondre aux cycles acceptés par le backend
   * (utils/schemas.js) : Maternelle / Primaire / Collège. N'est pas affichée telle quelle.
   */
  name: string
  /** Libellé affiché sur le site (ex. « Préscolaire » pour la valeur technique « Maternelle »). */
  label: string
  /** Segment d'URL de la page d'admission : /admissions/<slug>. */
  slug: string
  age: string
  text: string
  /** Classes proposées. Doivent correspondre aux classes acceptées par le backend. */
  classes: string[]
  skills: string[]
  programs: { icon: string; title: string; text: string }[]
}

export interface SchoolProfile {
  /** Identifiant technique (sert aussi de clé de stockage des fake data). */
  id: string
  logo: string
  /** Valeurs par défaut des paramètres (affichées avant chargement et utilisées par les fake data). */
  settings: Settings
  footerText: string
  hero: { eyebrow: string; titleLines: string[]; highlight: string; intro: string; images: string[] }
  founder: {
    photo: string
    photoAlt: string
    eyebrow: string
    titleLines: string[]
    greeting: string
    paragraphs: string[]
    signature: string
  }
  history: { title: string; paragraphs: string[]; stats: { value: string; label: string }[] }
  values: { icon: string; title: string; text: string }[]
  faq: { q: string; a: string; link?: { to: string; label: string } }[]
  cycles: CycleProfile[]
  admissions: { documents: string[] }
}

// ----------------------------------------------------------------------------
//  COLLÈGE SAINTE TRINITÉ KARA (CST-K) — Soumbou / Tomdè, Kara
//  Établissement confessionnel catholique (Diocèse de Kara), collège de la 6e à la 3e.
//  Données vérifiées : nom, statut, téléphone, quartier, repère (route du CHR de Tomdè),
//  classes, BEPC, tenues ; création en 2021 (1re promotion de 6e le 27 septembre 2021),
//  cycle complet en 2024-2025, effectifs, devise « Pour Dieu et la Patrie » (site officiel).
//  Données FICTIVES à confirmer : e-mail, horaires, tarifs, textes de présentation,
//  nom du directeur.
// ----------------------------------------------------------------------------
export const school: SchoolProfile = {
  id: 'college-sainte-trinite-kara',
  logo: '/sainte-trinite-logo.png',
  settings: {
    name: 'Collège Sainte Trinité Kara',
    shortName: 'Collège Sainte Trinité',
    slogan: 'POUR DIEU ET LA PATRIE',
    address: 'Quartier Soumbou / Tomdè, route du CHR de Tomdè — Kara, Togo',
    email: 'contact@saintetrinite-kara.tg',
    phone: '+228 90 09 97 97',
    phone2: '',
    hours: 'Lundi – Vendredi : 7h00 – 17h30',
    annualFee: 90000,
    canteenFee: 400,
    badgeFee: 1000,
    uniformFee: 5000,
    apeFee: 2000,
  },
  footerText:
    'Collège catholique du Diocèse de Kara, sur la route du CHR de Tomdè : de la 6e à la 3e, une formation humaine, intellectuelle et spirituelle pour chaque élève.',
  hero: {
    eyebrow: 'POUR DIEU ET LA PATRIE',
    titleLines: ['Collège', 'Catholique'],
    highlight: 'Sainte Trinité Kara',
    intro:
      'Bienvenue sur le site officiel du Collège Sainte Trinité Kara (CST-K), établissement catholique du Diocèse de Kara. De la 6e à la 3e, nous accompagnons chaque élève jusqu’au BEPC.',
    images: ['/hero/hero-1.jpg', '/hero/hero-2.jpg', '/hero/hero-3.jpg'],
  },
  founder: {
    photo: '/directeur-general.jpg',
    photoAlt: 'Le directeur du Collège Sainte Trinité Kara',
    eyebrow: 'UN MOT DU DIRECTEUR',
    titleLines: ['Former l’esprit,', 'le cœur et le caractère.'],
    greeting: 'Chers parents, chers élèves,',
    paragraphs: [
      'Le Collège Sainte Trinité Kara est né d’un pari audacieux : ouvrir, en pleine crise sanitaire, un établissement catholique de qualité au service des familles de Kara. Depuis notre première promotion de 6e en 2021, nous grandissons avec nos élèves.',
      'Fidèles à notre devise, « Pour Dieu et la Patrie », nous voulons former des jeunes compétents, disciplinés et solidaires, en associant l’exigence des études aux valeurs de l’Évangile.',
    ],
    signature: 'Le Directeur',
  },
  history: {
    title: 'Notre Histoire',
    paragraphs: [
      'Le Collège Sainte Trinité Kara (CST-K) est un établissement d’enseignement confessionnel catholique du Diocèse de Kara. Il est situé dans le quartier Soumbou / Tomdè, sur la route qui mène au Centre Hospitalier Régional (CHR) de Tomdè.',
      'Ouvert en pleine crise sanitaire de la COVID-19, le collège a accueilli sa première promotion de 6e le 27 septembre 2021, avec 42 élèves. Il a ensuite ouvert ses classes année après année : 102 élèves en 2022-2023, puis 158 en 2023-2024.',
      'Les travaux de construction se sont achevés en janvier 2024, et le collège propose depuis la rentrée 2024-2025 un premier cycle complet, de la 6e à la 3e, préparant au BEPC.',
    ],
    stats: [
      { value: '2021', label: 'Année d’ouverture' },
      { value: '4', label: 'Niveaux, de la 6e à la 3e' },
      { value: '150+', label: 'Élèves' },
    ],
  },
  values: [
    {
      icon: 'heart',
      title: 'Foi',
      text: 'Une éducation éclairée par les valeurs de l’Évangile.',
    },
    {
      icon: 'graduation',
      title: 'Excellence',
      text: 'Un enseignement exigeant, tourné vers la réussite au BEPC.',
    },
    {
      icon: 'shield',
      title: 'Discipline',
      text: 'Rigueur, ponctualité, tenue correcte et respect de chacun.',
    },
    {
      icon: 'users',
      title: 'Patrie',
      text: 'Former des citoyens responsables, au service de leur pays.',
    },
  ],
  faq: [
    {
      q: 'Où se trouve le collège ?',
      a: 'À Kara, dans le quartier Soumbou / Tomdè, sur la route qui mène au CHR (Centre Hospitalier Régional) de Tomdè.',
    },
    {
      q: 'Le collège est-il réservé aux élèves catholiques ?',
      a: 'Le Collège Sainte Trinité est un établissement catholique du Diocèse de Kara. Il accueille les familles qui adhèrent à son projet éducatif et à son règlement intérieur.',
    },
    {
      q: 'Quelles classes proposez-vous ?',
      a: 'Le premier cycle du secondaire au complet : 6e, 5e, 4e et 3e. Les élèves de 3e présentent l’examen national du BEPC.',
      link: { to: '/cycles', label: 'Voir nos classes' },
    },
    {
      q: 'Quelle est la tenue des élèves ?',
      a: 'Garçons : chemise en tissu bleu bordée de blanc avec le logo de la Trinité et pantalon kaki. Filles : même chemise bleue et jupe kaki longue, taille haute, jusqu’à la cheville. L’après-midi et pour les activités, un haut style Lacoste blanc bordé d’orange avec le logo du collège.',
    },
    {
      q: 'À combien s’élèvent les frais de scolarité ?',
      a: 'La scolarité annuelle et les frais annexes sont détaillés sur la page Tarifs et scolarité. Le paiement peut se faire en trois tranches.',
      link: { to: '/tarifs', label: 'Voir les tarifs' },
    },
  ],
  cycles: [
    {
      name: 'Collège',
      label: 'Collège',
      slug: 'college',
      age: '11 à 16 ans',
      text: 'Le Collège Sainte Trinité accueille les élèves de la 6e à la 3e (secondaire 1er cycle). Il approfondit les connaissances et les méthodes de travail, accompagne la croissance humaine et spirituelle de chacun, et prépare à l’examen national du BEPC (Brevet d’Études du Premier Cycle).',
      classes: ['6e', '5e', '4e', '3e'],
      skills: [
        'Enseignements généraux du programme officiel',
        'Méthodes de travail et autonomie',
        'Éducation humaine, morale et spirituelle',
        'Préparation au BEPC en classe de 3e',
      ],
      programs: [
        {
          icon: 'graduation',
          title: 'Objectif BEPC',
          text: 'Suivi renforcé, devoirs surveillés et examens blancs en 3e.',
        },
        {
          icon: 'heart',
          title: 'Vie chrétienne',
          text: 'Catéchèse, célébrations et engagement au service des autres.',
        },
        {
          icon: 'users',
          title: 'Activités de l’après-midi',
          text: 'Sport, clubs et activités culturelles, en tenue Lacoste du collège.',
        },
      ],
    },
  ],
  admissions: {
    documents: [
      'Une (1) copie légalisée de l’acte de naissance',
      'Les bulletins de notes de l’année précédente',
      'Le relevé ou l’attestation de réussite au CEPE (pour une entrée en 6e)',
      'Un certificat de scolarité ou de transfert (pour un élève venant d’un autre établissement)',
      'Deux (2) photos d’identité récentes',
      'Un (1) carnet de santé',
    ],
  },
}

/** Classes par cycle, dérivées du profil (formulaires, filtres, fake data). */
export const classesByCycle: Record<string, string[]> = Object.fromEntries(
  school.cycles.map((c) => [c.name, c.classes]),
)

/** Libellé affiché d'un cycle à partir de sa valeur technique (ex. « Maternelle » → « Préscolaire »). */
export const cycleLabel = (name: string): string =>
  school.cycles.find((c) => c.name === name)?.label ?? name
