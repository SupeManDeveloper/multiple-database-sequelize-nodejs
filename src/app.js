"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("../config/index"));
const index_2 = require("../db/models/index");
const { env, port } = (0, index_1.default)();
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.send("This is migration service");
});
app.get("/audios", async (req, res) => {
    const audios = await index_2.db.Audio.findAll();
    res.json(audios);
});
app.get("/users", async (req, res) => {
    const users = await index_2.db.User.findAll();
    res.json(users);
});
app.listen(port, async () => {
    try {
        await index_2.db.User.sequelize.authenticate();
        await index_2.db.User.sequelize.sync();
        await index_2.db.Audio.sequelize.authenticate();
        await index_2.db.Audio.sequelize.sync();
        console.log('Connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error?.message);
    }
    console.log(`Welcome to my migration service with port: ${port} on ${env} environment`);
});
process.on('uncaughtException', (e) => {
    console.log("Catching an exception", e?.message);
});
