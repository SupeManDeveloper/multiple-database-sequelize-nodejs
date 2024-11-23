"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelizeInstances = exports.db = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../../config/index"));
const basename = path.basename(__filename);
const env = (0, index_1.default)().env || "development";
const config = require(path.resolve("./config", "config.ts"))[env];
console.log(config, "database configs");
const sequelizeInstances = {};
exports.sequelizeInstances = sequelizeInstances;
const db = {};
exports.db = db;
const databases = Object.keys(config.databases);
for (let i = 0; i < databases.length; ++i) {
    const database = databases[i];
    const dbPath = config.databases[database];
    if (config.use_env_variable) {
        sequelizeInstances[database] = new sequelize_1.Sequelize(process.env[config.use_env_variable], config);
    }
    else {
        sequelizeInstances[database] = new sequelize_1.Sequelize(dbPath.database, dbPath.username, dbPath.password, dbPath);
    }
}
for (let i = 0; i < databases.length; ++i) {
    const database = databases[i].toLowerCase();
    fs.readdirSync(path.join(__dirname, database))
        .filter((file) => {
        return (file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js");
    })
        .forEach((file) => {
        const modelFactory = require(path.join(__dirname, database, file));
        const model = modelFactory(sequelizeInstances[databases[i]], sequelize_1.DataTypes);
        if (model && model.name) {
            db[model.name] = model;
        }
    });
}
Object.keys(db).forEach((modelName) => {
    const model = db[modelName];
    if (typeof model === "function" && "associate" in model) {
        model.associate(db);
    }
});
