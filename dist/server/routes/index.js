"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    {
        method: 'GET',
        path: '/repos',
        handler: 'getReposController.index',
        config: {
            policies: [],
            auth: false,
        },
    },
    {
        method: 'POST',
        path: '/project',
        handler: 'projectController.create',
        config: {
            policies: [],
            auth: false,
        },
    },
    {
        method: 'DELETE',
        path: '/project/:id',
        handler: 'projectController.delete',
        config: {
            policies: [],
            auth: false,
        },
    },
    {
        method: 'POST',
        path: '/projects',
        handler: 'projectController.createAll',
        config: {
            policies: [],
            auth: false,
        },
    },
    {
        method: 'DELETE',
        path: '/projects',
        handler: 'projectController.deleteAll',
        config: {
            policies: [],
            auth: false,
        },
    },
];
