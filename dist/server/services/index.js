"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_repos_service_1 = __importDefault(require("./get-repos-service"));
const project_service_1 = __importDefault(require("./project-service"));
exports.default = {
    getReposService: get_repos_service_1.default,
    projectService: project_service_1.default,
};
