"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("@octokit/request");
exports.default = ({ strapi }) => ({
    getPublicRepos: async () => {
        const result = await (0, request_1.request)("GET /user/repos", {
            headers: {
                authorization: `token ${process.env.GITHUB_TOKEN}`,
            },
            type: "public",
        });
        return result;
    },
});
