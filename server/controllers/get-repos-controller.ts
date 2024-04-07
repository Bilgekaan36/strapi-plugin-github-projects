import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  index: async (ctx) => {
    ctx.body = await strapi
      .plugin("github-projects")
      .service("getReposService")
      .getPublicRepos();
  },
});
