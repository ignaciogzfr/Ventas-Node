import { Sequelize,  Model } from "sequelize";

export class VentaDetalleModel extends Model {

}

export const initVentaDetalles = (db: Sequelize) => {
    db.define('VentaDetalle', {
    
    },{
        tableName: 'VentaDetalles',
        
        timestamps: true,
    }
    )
}

export class VentaDetalles {

}