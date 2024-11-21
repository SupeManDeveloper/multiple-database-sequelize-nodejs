"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envpath = void 0;
exports.default = config;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const dbConfig_1 = require("../helpers/dbConfig");
const env = "development";
let envfile;
switch (env) {
    default:
        envfile = ".env.dev";
        break;
}
exports.envpath = path_1.default.join(__dirname, "../", envfile);
let cache;
dotenv_1.default.config({ path: exports.envpath });
function config() {
    if (!cache) {
        cache = Object.freeze({
            env,
            version: process.env.NODE_API_VERSION,
            port: process.env.NODE_PORT,
            secrets: {
                name: process.env.DB_NAME || "",
                host: process.env.DB_HOST || "",
                port: +(process.env.DB_PORT || "") || 25,
                username: process.env.DB_USERNAME || "",
                password: process.env.DB_PASSWORD || "",
                dialect: process.env.DB_DIALECT || ""
            },
            dbVariables: (0, dbConfig_1.fetchAllDbConfig)(exports.envpath),
        });
    }
    return cache;
}
