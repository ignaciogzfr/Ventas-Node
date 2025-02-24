import { Sequelize,  Model, DataTypes } from "sequelize";
import { ServiceModel } from "../services/sequelize";

export class VentaDetalleModel extends Model {
    IDDetalle: number;
    IDVenta: number;
    IDProducto: number;
    Cantidad: number;
    TotalLinea: number;
    PrecioUnitario: number;
}

export const initVentaDetalles = (db: Sequelize) => {
    db.define('VentaDetalles', {
        IDDetalle: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false, unique: true, field: 'ID_VentaDetalle' },
        IDVenta: { type: DataTypes.INTEGER, allowNull: false, field: 'ID_Venta' },
        IDProducto: { type: DataTypes.INTEGER, allowNull: false, field: 'ID_Producto' },
        Cantidad: { type: DataTypes.INTEGER, allowNull: false, field: 'Cantidad' },
        TotalLinea: { type: DataTypes.INTEGER, allowNull: false, field: 'TotalLinea' },
        PrecioUnitario: { type: DataTypes.INTEGER, allowNull: false, field: 'Precio_Unitario' },
    },{
        tableName: 'VentaDetalle',
        
        timestamps: false,
    }
    )
}

export class VentaDetalles {
    db: ServiceModel;
    constructor(db: ServiceModel) {
        this.db = db;
    }
}