"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const project_schema_1 = __importDefault(require("./project-schema"));
exports.default = {
    project: { schema: project_schema_1.default },
};
