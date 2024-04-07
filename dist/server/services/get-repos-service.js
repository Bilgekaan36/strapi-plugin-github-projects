'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { request } = require('@octokit/request');
const axios_1 = __importDefault(require("axios"));
const markdown_it_1 = __importDefault(require("markdown-it"));
const md = (0, markdown_it_1.default)();
exports.default = ({ strapi }) => ({
    getProjectForRepo: async (repo) => {
        const { id } = repo;
        const matchingProjects = await strapi.entityService.findMany('plugin::github-projects.project', {
            filters: {
                repositoryId: id,
            },
        });
        if (matchingProjects.length === 1)
            return matchingProjects[0].id;
        return null;
    },
    getPublicRepos: async () => {
        const result = await request('GET /user/repos', {
            headers: {
                authorization: `token ${process.env.GITHUB_TOKEN}`,
            },
            type: 'public',
        });
        // id, name, shortDescription, url, longDescription
        // https://raw.githubusercontent.com/artcoded-net/next-strapi-blog/main/README.md
        return Promise.all(result.data.map(async (item) => {
            const { id, name, description, html_url, owner, default_branch } = item;
            // const readmeUrl = `https://raw.githubusercontent.com/${owner.login}/${name}/${default_branch}/README.md`;
            let longDescription = '';
            try {
                const readmeUrl = `https://raw.githubusercontent.com/${owner.login}/${name}/${default_branch}/README.md`;
                const readmeFile = await axios_1.default.get(readmeUrl);
                longDescription = md
                    .render(readmeFile.data)
                    .replaceAll('\n', '<br/>');
            }
            catch (e) {
                longDescription = '-'; // No readme found.
            }
            const repo = {
                id,
                name,
                shortDescription: description,
                url: html_url,
                longDescription,
            };
            const relatedProjectId = await strapi
                .plugin('github-projects')
                .service('getReposService')
                .getProjectForRepo(repo);
            return {
                ...repo,
                projectId: relatedProjectId,
            };
        }));
    },
});
