import { Strapi } from '@strapi/strapi';


const RBAC_ACTIONS = [
  {
    section: 'plugins',
    displayName: 'View and access the plugin',
    uid: 'use',
    pluginName: 'github-projects',
  },
  {
    section: 'plugins',
    subCategory: 'Repositories',
    displayName: 'Read Github repositories',
    uid: 'repos.read',
    pluginName: 'github-projects',
  },
  {
    section: 'plugins',
    subCategory: 'Projects',
    displayName: 'Read Project entities',
    uid: 'projects.read',
    pluginName: 'github-projects',
  },
  {
    section: 'plugins',
    subCategory: 'Projects',
    displayName: 'Create Project entities',
    uid: 'projects.create',
    pluginName: 'github-projects',
  },
  {
    section: 'plugins',
    subCategory: 'Projects',
    displayName: 'Delete Project entities',
    uid: 'projects.delete',
    pluginName: 'github-projects',
  },
];

export default async ({ strapi }: { strapi: Strapi }) => {
  await strapi.admin?.services.permission.actionProvider.registerMany(
    RBAC_ACTIONS
  );
};
