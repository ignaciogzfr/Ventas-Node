import { Sequelize, Model, DataTypes } from "sequelize";
import { ServiceModel } from "../services/sequelize";

export class ProductosModel extends Model {
    IDProducto: number;
    Nombre: string;
    Codigo: string;
    IDMarca: number;
    Modelo: string;
    Costo: number;
}

export const initProductos = (db: Sequelize) => {
    db.define('Productos', {
        IDProducto: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false, unique: true, field: 'ID_Producto' },
        Nombre: { type: DataTypes.STRING, allowNull: false },
        Codigo: { type: DataTypes.STRING, allowNull: false },
        IDMarca: { type: DataTypes.INTEGER, allowNull: false, field: 'ID_Marca' },
        Modelo: { type: DataTypes.STRING, allowNull: false },
        Costo: { type: DataTypes.INTEGER, allowNull: false, field: 'Costo_Unitario' },
    }, {
        tableName: 'Producto',

        timestamps: false,
    }
    );
};

export class Productos {
    db: ServiceModel;
    constructor(db: ServiceModel) {
        this.db = db;
    }
}