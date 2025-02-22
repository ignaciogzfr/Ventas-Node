import { Sequelize } from 'sequelize';
import { initVentas } from '../entities/Venta';

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
        initVentas(this.db);
        this.db.sync();
        this.models = this.db.models;
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