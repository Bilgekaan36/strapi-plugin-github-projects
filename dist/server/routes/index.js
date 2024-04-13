"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    {
        method: 'GET',
        path: '/repos',
        handler: 'getReposController.index',
        config: {
            policies: [
                'admin::isAuthenticatedAdmin',
                {
                    name: 'admin::hasPermissions',
                    config: {
                        actions: [
                            'plugin::github-projects.repos.read',
                            'plugin::github-projects.projects.read',
                        ],
                    },
                },
            ],
        },
    },
    {
        method: 'POST',
        path: '/project',
        handler: 'projectController.create',
        config: {
            policies: [
                'admin::isAuthenticatedAdmin',
                {
                    name: 'admin::hasPermissions',
                    config: {
                        actions: ['plugin::github-projects.projects.create'],
                    },
                },
            ],
        },
    },
    {
        method: 'DELETE',
        path: '/project/:id',
        handler: 'projectController.delete',
        config: {
            policies: [
                'admin::isAuthenticatedAdmin',
                {
                    name: 'admin::hasPermissions',
                    config: {
                        actions: ['plugin::github-projects.projects.delete'],
                    },
                },
            ],
        },
    },
    {
        method: 'POST',
        path: '/projects',
        handler: 'projectController.createAll',
        config: {
            policies: [
                'admin::isAuthenticatedAdmin',
                {
                    name: 'admin::hasPermissions',
                    config: {
                        actions: ['plugin::github-projects.projects.create'],
                    },
                },
            ],
        },
    },
    {
        method: 'DELETE',
        path: '/projects',
        handler: 'projectController.deleteAll',
        config: {
            policies: [
                'admin::isAuthenticatedAdmin',
                {
                    name: 'admin::hasPermissions',
                    config: {
                        actions: ['plugin::github-projects.projects.delete'],
                    },
                },
            ],
        },
    },
];
