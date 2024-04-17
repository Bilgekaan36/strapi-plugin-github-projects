'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("@octokit/request");
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
        const result = await (0, request_1.request)('GET /user/repos', {
            headers: {
                authorization: `token ${process.env.GITHUB_TOKEN}`,
            },
            type: 'public',
            per_page: 100,
        });
        return Promise.all(result.data.map(async (item) => {
            const { id, name, description, html_url, owner, default_branch } = item;
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
                description,
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
