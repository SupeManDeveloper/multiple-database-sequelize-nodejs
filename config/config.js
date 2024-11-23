"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const { secrets, dbVariables } = (0, index_1.default)();
module.exports = {
    development: {
        username: secrets.username,
        password: secrets.password,
        database: secrets.name,
        host: secrets.host,
        port: secrets.port,
        dialect: secrets.dialect,
        dialectOptions: {
            bigNumberStrings: true,
        },
        databases: {
            audio: {
                username: dbVariables.dbAudioUsername,
                password: dbVariables.dbAudioPassword,
                database: dbVariables.dbAudioName,
                host: dbVariables.dbAudioHost,
                port: secrets.port,
                dialect: secrets.dialect,
                dialectOptions: {
                    bigNumberStrings: true,
                },
            },
            user: {
                username: dbVariables.dbUserUsername,
                password: dbVariables.dbUserPassword,
                database: dbVariables.dbUserName,
                host: dbVariables.dbUserHost,
                port: secrets.port,
                dialect: secrets.dialect,
                dialectOptions: {
                    bigNumberStrings: true,
                },
            },
        },
    },
    audio: {
        username: dbVariables.dbAudioUsername,
        password: dbVariables.dbAudioPassword,
        database: dbVariables.dbAudioName,
        host: dbVariables.dbAudioHost,
        port: secrets.port,
        dialect: secrets.dialect,
        dialectOptions: {
            bigNumberStrings: true,
        },
    },
    user: {
        username: dbVariables.dbUserUsername,
        password: dbVariables.dbUserPassword,
        database: dbVariables.dbUserName,
        host: dbVariables.dbUserHost,
        port: secrets.port,
        dialect: secrets.dialect,
        dialectOptions: {
            bigNumberStrings: true,
        },
    },
};
