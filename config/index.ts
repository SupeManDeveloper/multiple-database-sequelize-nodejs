import dotenv from "dotenv";
import path from "path";
import { DbConfig, fetchAllDbConfig } from "../helpers/dbConfig";

type Secrets = Readonly<{
    env: string;
    version: string;
    port: string;
    secrets: {
        name: string;
        host: string;
        port: number;
        username: string;
        password: string;
        dialect: string;
    };
    dbVariables: DbConfig
}>;

const env = "development";

let envfile: string;

switch (env) {
    default:
        envfile = ".env.dev";
        break;
}

export const envpath: string = path.join(__dirname, "../", envfile);
let cache: Secrets;
dotenv.config({ path: envpath });
export default function config() {
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
            dbVariables: fetchAllDbConfig(envpath),
        });
    }
    return cache;
}