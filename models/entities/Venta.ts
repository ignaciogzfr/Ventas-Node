import { Sequelize, DataTypes, Model, Op } from "sequelize";
import { ServiceModel } from "../services/sequelize";

export class VentaModel extends Model {
    IDVenta: number;
    Total: number;
    Fecha: string;
    IDLocal: number;
}

export const initVentas = (db: Sequelize) => {
    db.define('Venta', {

        IDVenta: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false, unique: true, field: 'ID_Venta' },
        Total: { type: DataTypes.INTEGER, allowNull: false },
        Fecha: { type: DataTypes.DATEONLY, allowNull: false },
        IDLocal: { type: DataTypes.INTEGER, allowNull: false, field: 'ID_Local' },

    }, {
        tableName: 'Venta',
        timestamps: false,
    }
    );
};

export class Ventas {

    db: ServiceModel;
    constructor(db: ServiceModel) {
        this.db = db;
    }

    async getLast30Days(searchDate: string | Date) {

        const date = new Date(searchDate);
        // Example: Date from 2024-03-31 to 2024-04-30
        const where = {
            fecha: {
                [Op.between]: [date.toISOString(), new Date(new Date().setDate(date.getDate() + 30)).toISOString()]
            }
        };
        const order = [
            ['Fecha', 'DESC']
        ];
        const include = [
            { association: 'Local' },
            { association: 'Detalles', include: [{ association: 'Producto', include: 'Marca' }] }
        ];
        const ventas = await this.db.models.Venta.findAll({
            where,
            order,
            include
        });
        return ventas;
    }

}