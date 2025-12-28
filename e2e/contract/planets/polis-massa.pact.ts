import { MatchersV3 } from '@pact-foundation/pact';
import { POLIS_MASSA_REQUEST } from './polis-massa.request';

const { like } = MatchersV3;

export const POLIS_MASSA_PACT_RESPONSE = {
  message: like('ok'),
  apiVersion: like('1.0'),
  timestamp: like('2025-01-01T00:00:00.000Z'),

  result: like([
    {
      _id: like('id'),
      uid: like('15'),
      __v: like(2),
      description: like('A planet.'),
      properties: {
        name: like('Polis Massa'),
        climate: like('artificial temperate'),
        terrain: like('airless asteroid'),
        population: like('1000000'),
        url: like('https://www.swapi.tech/api/planets/15'),
      },
    },
  ]),

  support: like({}),
  social: like({}),
};

export { POLIS_MASSA_REQUEST };
