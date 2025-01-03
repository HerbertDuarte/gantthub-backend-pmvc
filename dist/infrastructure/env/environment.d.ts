type NodeEnv = 'production' | 'development' | 'test';
export declare class Environment {
    APP_NAME: string;
    APP_HOSTNAME: string;
    APP_VERSION: string;
    HTTP_PORT: number;
    NODE_ENV: NodeEnv;
    JWT_SECRET: string;
    JWT_EXPIRE: string;
    DATABASE_URL: string;
}
export declare function validateEnv(config: Record<string, any>): Environment;
export {};
