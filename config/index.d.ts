import { DbConfig } from "../helpers/dbConfig";
export declare const envpath: string;
export default function config(): Readonly<{
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
    dbVariables: DbConfig;
}>;
