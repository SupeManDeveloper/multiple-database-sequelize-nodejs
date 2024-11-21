export type DbConfig = {
    dbAudioURL: string;
    dbAudioName: string;
    dbAudioHost: string;
    dbAudioPassword: string;
    dbAudioUsername: string;
};
export declare const fetchAllDbConfig: (envpath?: string) => DbConfig;
