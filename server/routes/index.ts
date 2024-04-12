export default [
  {
    method: 'GET',
    path: '/repos',
    handler: 'getReposController.index',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'POST',
    path: '/project',
    handler: 'projectController.create',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'DELETE',
    path: '/project/:id',
    handler: 'projectController.delete',
    config: {
      policies: [],
      auth: false,
    },
  },
];
