import { Sequelize, DataTypes, Model } from "sequelize";
import { ServiceModel } from "../services/sequelize";

export class LocalModel extends Model {
    IDLocal: number;
    Nombre: string;
    Direccion: string;
}

export const initSales = (db: Sequelize) => {
    db.define('Local', {
        IDLocal: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false, unique: true, field: 'ID_Local' },
        Nombre: { type: DataTypes.STRING, allowNull: false },
        Direccion: { type: DataTypes.STRING, allowNull: false },
    }, {
        tableName: 'Local',

        timestamps: false,
    }
    );
};

export class Locales {
    db: ServiceModel;
    constructor(db: ServiceModel) {
        this.db = db;
    }
}