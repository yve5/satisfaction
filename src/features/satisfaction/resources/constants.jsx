export const SATISFACTION_CHANGE_VALUE = 'SATISFACTION_CHANGE_VALUE';

export const SATISFACTION_RANGE_STEP = 1;

export const SATISFACTION_QUESTIONS = [
  {
    id: 'salary',
    label: 'Votre salaire vous convient-il ?',
    importance: 0.2,
  },
  {
    id: 'satisfaction',
    label: 'Aimez-vous réellement faire les tâches de votre poste ?',
    importance: 0.15,
  },
  {
    id: 'employability',
    label:
      'Exercer ce travail vous rapproche-t-il de vos objectifs professionnels ?',
    importance: 0.15,
  },
  {
    id: 'sideproject',
    label: 'Avez-vous du temps pour vos projets personnels ?',
    importance: 0.1,
  },
  {
    id: 'culture',
    label: 'Vos collègues sont-ils d’accord avec vous ?',
    importance: 0.1,
  },
  {
    id: 'health',
    label: 'Votre société se porte-t-elle bien ?',
    importance: 0.1,
  },
  {
    id: 'location',
    label: 'Aimez-vous votre lieu de travail ?',
    importance: 0.05,
  },
  {
    id: 'teamwork',
    label: 'Appréciez-vous la qualité du travail d’équipe ?',
    importance: 0.05,
  },
  {
    id: 'outlook',
    label:
      'Vos perspectives d’évolution professionnelles vous convient-elles ?',
    importance: 0.05,
  },
  {
    id: 'interaction',
    label:
      'L’intéraction avec les personnes en ou hors de l’entreprise vous satisfait-elle ?',
    importance: 0.05,
  },
];

export const SATISFACTION_MESSAGES = [
  {
    className: 'alert-danger',
    message:
      'Songez à deux fois avant d’accepter le job, ou le quitter sur-le-champ.',
  },
  {
    className: 'alert-warning',
    message: 'Vous êtes sur la bonne voie pour trouver le job parfait.',
  },
  {
    className: 'alert-primary',
    message: 'Le job vous correspond.',
  },
  {
    className: 'alert-success',
    message: 'Vous avez le job parfait !',
  },
];
