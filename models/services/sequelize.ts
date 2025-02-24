import { Sequelize } from 'sequelize';
import initializeModels from './InitializeModels';
import createAssociations from './Associations'

export class ServiceModel {
    db: Sequelize;
    models: any;
    constructor(config: {
        database: string,
        username: string,
        password?: string,
        host: string;
        port: number;
    }) {

        this.db = this.connectToDB(config);
        initializeModels(this.db);
        this.models = this.db.models;
        createAssociations(this.models);
    }

    connectToDB(config: {
        database: string,
        username: string,
        password?: string,
        host: string;
        port: number;
    }) {
        const sequelize = new Sequelize(config.database, config.username, config.password, {
            host: config.host,
            dialect: 'mssql',
            port: config.port,
        });
        return sequelize;
    }
}