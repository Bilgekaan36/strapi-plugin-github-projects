import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  create: async (ctx) => {
    const repo = ctx.request.body;
    const newProject = await strapi
      .plugin('github-projects')
      .service('projectService')
      .create(repo, '1');
    return newProject;
  },
  delete: async (ctx) => {
    const projectId = ctx.params.id;
    const deletedProject = await strapi
      .plugin('github-projects')
      .service('projectService')
      .delete(projectId);
    return deletedProject;
  },
});
