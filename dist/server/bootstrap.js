"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = async ({ strapi }) => {
    var _a;
    await ((_a = strapi.admin) === null || _a === void 0 ? void 0 : _a.services.permission.actionProvider.registerMany(RBAC_ACTIONS));
};
