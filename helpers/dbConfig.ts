import dotenv from 'dotenv';

export type DbConfig = {
    dbAudioURL: string;
    dbAudioName: string;
    dbAudioHost: string;
    dbAudioPassword: string;
    dbAudioUsername: string;
    dbUserURL: string;
    dbUserName: string;
    dbUserHost: string;
    dbUserPassword: string;
    dbUserUsername: string;
};

export const fetchAllDbConfig = (envpath?: string): DbConfig => {
    dotenv.config({ path: envpath });

    const DBs = {
        AUDIO: "Audio",
        USER: "User",
    };

    const dbVariables: DbConfig = {
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