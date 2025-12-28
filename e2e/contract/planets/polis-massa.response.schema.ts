export const POLIS_MASSA_RESPONSE_SCHEMA = {
  type: 'object',
  required: ['message', 'result', 'apiVersion', 'timestamp', 'support', 'social'],
  properties: {
    message: { type: 'string' },
    apiVersion: { type: 'string' },
    timestamp: { type: 'string' },

    result: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        required: ['properties', '_id', 'description', 'uid', '__v'],
        properties: {
          _id: { type: 'string' },
          description: { type: 'string' },
          uid: { type: 'string' },
          __v: { type: 'number' },

          properties: {
            type: 'object',
            required: [
              'created',
              'edited',
              'climate',
              'surface_water',
              'name',
              'diameter',
              'rotation_period',
              'terrain',
              'gravity',
              'orbital_period',
              'population',
              'url',
            ],
            additionalProperties: true,
            properties: {
              created: { type: 'string' },
              edited: { type: 'string' },
              climate: { type: 'string' },
              surface_water: { type: 'string' },
              name: { type: 'string' },
              diameter: { type: 'string' },
              rotation_period: { type: 'string' },
              terrain: { type: 'string' },
              gravity: { type: 'string' },
              orbital_period: { type: 'string' },
              population: { type: 'string' },
              url: { type: 'string' },
            },
          },
        },
      },
    },

    support: { type: 'object' },
    social: { type: 'object' },
  },
} as const;
