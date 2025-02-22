import { Sequelize, DataTypes, Model, Op } from "sequelize";
import { ServiceModel } from "../services/sequelize";

export class VentaModel extends Model {
    IDVenta: number;
    TotalPesos: number;
    Fecha: string;
    Neto: number;
    Iva: number;
    IDLocal: number;
}

export const initVentas = (db: Sequelize) => {
    db.define('Venta', {

        IDVenta: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false, unique: true, field: 'ID_Venta' },
        TotalPesos: { type: DataTypes.INTEGER, allowNull: false },
        Fecha: { type: DataTypes.DATE, allowNull: false },
        Neto: { type: DataTypes.INTEGER, allowNull: false },
        Iva: { type: DataTypes.INTEGER, allowNull: false },
        IDLocal: { type: DataTypes.INTEGER, allowNull: false, field: 'ID_Local' },

    }, {
        tableName: 'Venta',
        timestamps: true,
    }
    );
};

export class Ventas {

    db: ServiceModel;
    constructor(db: ServiceModel) {
        this.db = db;
    }

    async getLast30Days() {
        const where = {
            fecha: {
                [Op.gte]: new Date(new Date().setDate(new Date().getDate() - 30))
            }
        };
        const order = [
            ['Fecha', 'DESC']
        ];
        const ventas = await this.db.models.Venta.findAll({
            where,
            order
        });
        return ventas;
    }
    
}