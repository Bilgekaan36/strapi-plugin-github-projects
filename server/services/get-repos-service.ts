'use strict';

import { request } from '@octokit/request';
import axios from 'axios';
import markdownit from 'markdown-it';
const md = markdownit();

export default ({ strapi }) => ({
  getProjectForRepo: async (repo) => {
    const { id } = repo;
    const matchingProjects = await strapi.entityService.findMany(
      'plugin::github-projects.repository',
      {
        filters: {
          repositoryId: id,
        },
      }
    );
    if (matchingProjects.length === 1) return matchingProjects[0].id;
    return null;
  },
  getPublicRepos: async () => {
    const result = await request('GET /user/repos', {
      headers: {
        authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
      type: 'public',
      per_page: 100,
    });

    return Promise.all(
      result.data.map(async (item) => {
        const { id, name, description, html_url, owner, default_branch } = item;
        let longDescription = '';
        try {
          const readmeUrl = `https://raw.githubusercontent.com/${owner.login}/${name}/${default_branch}/README.md`;
          const readmeFile = await axios.get(readmeUrl);
          longDescription = md
            .render(readmeFile.data)
            .replaceAll('\n', '<br/>');
        } catch (e) {
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
      })
    );
  },
});
