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
export declare const fetchAllDbConfig: (envpath?: string) => DbConfig;
