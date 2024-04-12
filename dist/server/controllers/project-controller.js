"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ strapi }) => ({
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
