module.exports = {
  schema: '../../schemas/graphql-console/schema.graphql',
  language: 'typescript',
  src: '.',
  excludes: ['**/dist/**', '**/__mocks__/**', '**/Dockerfile*', '**/docker/**'],
};
