import { omit } from 'lodash-es';
import { createCrudRoute } from './utils.js';
import { getCollection } from './db.js';

const categorySchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    favorite: { type: 'boolean' },
  },
};
const categoryCreationSchema = omit(categorySchema, ['properties.id']);
const categoryRoutes = createCrudRoute('categories', categorySchema, categoryCreationSchema);

const listPostsRoute = {
  method: 'GET',
  url: '/categories/:id/posts',
  schema: {
    params: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'id of category to get posts for',
        },
      },
    },
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            description: { type: 'string' },
            date: { type: 'string', description: 'date of creation' },
            categories: { type: 'array', items: { type: 'string' }, description: 'id of tags' },
          },
        },
      },
    },
  },
  handler: async (request) =>
    (await getCollection('posts')).filter((post) => post.categories?.includes(request.params.id)),
};


export const routes = [...categoryRoutes, listPostsRoute];
