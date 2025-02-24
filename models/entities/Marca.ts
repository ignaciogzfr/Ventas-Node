import { Sequelize,  Model, DataTypes } from "sequelize";
import { ServiceModel } from "../services/sequelize";

export class MarcaModel extends Model {
    IDMarca: number
    Nombre: string
}

export const initMarcas = (db: Sequelize) => {
    db.define('Marca', {
        IDMarca: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false, unique: true, field: 'ID_Marca' },
        Nombre: { type: DataTypes.STRING, allowNull: false },
    },{
        tableName: 'Marca',
        
        timestamps: false,
    }
    )
}

export class Marcas {
    db: ServiceModel;
    constructor(db: ServiceModel) {
        this.db = db;
    }
}