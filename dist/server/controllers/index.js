"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_repos_controller_1 = __importDefault(require("./get-repos-controller"));
const project_controller_1 = __importDefault(require("./project-controller"));
exports.default = {
    getReposController: get_repos_controller_1.default,
    projectController: project_controller_1.default,
};
