import { Sequelize,  Model } from "sequelize";

export class ProductosModel extends Model {

}

export const initProductos = (db: Sequelize) => {
    db.define('Productos', {
    
    },{
        tableName: 'Productos',
        
        timestamps: true,
    }
    )
}

export class Productos {

}