import {
  getCollection,
  addItemToCollection,
  deleteItemFromCollection,
  getItemFromCollection,
  updateItemInCollection,
} from './db.js';

export const createCrudRoute = (collection, itemSchema, creationSchema) => {
  const collectionName = collection.toLowerCase();
  return [
    {
      method: 'GET',
      url: `/${collectionName}`,
      schema: {
        response: {
          200: {
            type: 'array',
            items: itemSchema,
          },
        },
      },
      handler: async () => getCollection(collectionName),
    },
    {
      method: 'POST',
      url: `/${collectionName}`,
      schema: {
        body: creationSchema,
        response: {
          201: itemSchema,
        },
      },
      handler: async (request, reply) => {
        const item = await addItemToCollection(request.body, collectionName);
        reply.code(201).send(item);
      },
    },
    {
      method: 'PUT',
      url: `/${collectionName}/:id`,
      schema: {
        body: itemSchema,
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'id of item to update',
            },
          },
        },
        response: {
          200: itemSchema,
        },
      },
      handler: async (request) => updateItemInCollection(request.body, collectionName),
    },
    {
      method: 'DELETE',
      url: `/${collectionName}/:id`,
      schema: {
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'id of item to delete',
            },
          },
        },
        response: {
          204: {
            type: 'null'
          }
        },
      },
      handler: async (request, reply) => {
        await deleteItemFromCollection(request.params.id, collectionName);
        reply.code(204).send();
      },
    },
    {
      method: 'GET',
      url: `/${collectionName}/:id`,
      schema: {
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'id of item to get',
            },
          },
        },
        response: {
          200: itemSchema,
        },
      },
      handler: async (request) => getItemFromCollection(request.params.id, collectionName),
    },
  ];
};
