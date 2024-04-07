"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    {
        method: "GET",
        path: "/repos",
        handler: "getReposController.index",
        config: {
            policies: [],
            auth: false, //TODO: change this tp authorized only for admin users
        },
    },
];
