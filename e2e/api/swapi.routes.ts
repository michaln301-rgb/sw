export const swapiRoutes = {
  baseURL: 'https://swapi.tech/api',
  resources: {
    planets: '/planets',
    people: '/people',
  },
} as const;

export type SwapiResource = keyof typeof swapiRoutes.resources; 
