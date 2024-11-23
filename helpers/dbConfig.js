"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllDbConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const fetchAllDbConfig = (envpath) => {
    dotenv_1.default.config({ path: envpath });
    const DBs = {
        AUDIO: "Audio",
        USER: "User",
    };
    const dbVariables = {
        dbAudioURL: "",
        dbAudioName: "",
        dbAudioHost: "",
        dbAudioPassword: "",
        dbAudioUsername: "",
        dbUserURL: "",
        dbUserName: "",
        dbUserHost: "",
        dbUserPassword: "",
        dbUserUsername: "",
    };
    for (let [key, value] of Object.entries(DBs)) {
        dbVariables[`db${value}URL`] = process.env[`DB_${key}_URL`] || "";
        dbVariables[`db${value}Name`] = process.env[`DB_${key}_NAME`] || "";
        dbVariables[`db${value}Host`] = process.env[`DB_${key}_HOST`] || "";
        dbVariables[`db${value}Password`] = process.env[`DB_${key}_PASSWORD`] || "";
        dbVariables[`db${value}Username`] = process.env[`DB_${key}_USERNAME`] || "";
    }
    return dbVariables;
};
exports.fetchAllDbConfig = fetchAllDbConfig;
