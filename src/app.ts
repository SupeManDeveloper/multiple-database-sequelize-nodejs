import express, { Request, Response } from 'express';

import config from "../config/index";
import { db } from "../db/models/index";

const { env, port } = config();

const app = express()

app.get("/", (req: Request, res: Response) => {
    res.send("This is migration service");
});

app.get("/audios", async (req: Request, res: Response) => {
    const audios = await db.Audio.findAll();
    res.json(audios)
});

app.get("/users", async (req: Request, res: Response) => {
    const users = await db.User.findAll();
    res.json(users)
});

app.listen(port, async () => {
    try {
        await db.User.sequelize.authenticate()
        await db.User.sequelize.sync();
        await db.Audio.sequelize.authenticate()
        await db.Audio.sequelize.sync();
        console.log('Connection has been established successfully.');
    } catch (error: any | Error) {
        console.error('Unable to connect to the database:', error?.message);
    }
    console.log(`Welcome to my migration service with port: ${port} on ${env} environment`);
})

process.on('uncaughtException', (e: Error) => {
    console.log("Catching an exception", e?.message);
})