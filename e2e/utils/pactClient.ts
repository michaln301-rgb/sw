import * as path from 'path';
import { PactV3, MatchersV3 } from '@pact-foundation/pact';

export const { like, eachLike, regex, integer } = MatchersV3;

export const createSwapiPact = () => {
  const pact = new PactV3({
    consumer: 'Fedex-QA-Assignment-UI',
    provider: 'swapi-tech',
    dir: path.resolve(process.cwd(), 'pacts'),
    logLevel: 'info',
  });

  return pact;
};
