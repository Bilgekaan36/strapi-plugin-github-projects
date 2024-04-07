"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ strapi }) => ({
    index: async (ctx) => {
        ctx.body = await strapi
            .plugin("github-projects")
            .service("getReposService")
            .getPublicRepos();
    },
});
