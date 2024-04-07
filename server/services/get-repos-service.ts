import { Strapi } from "@strapi/strapi";
import { request } from "@octokit/request";

export default ({ strapi }: { strapi: Strapi }) => ({
  getPublicRepos: async () => {
    const result = await request("GET /user/repos", {
      headers: {
        authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
      type: "public",
    });
    return result;
  },
});
