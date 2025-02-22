import { Sequelize,  Model } from "sequelize";

export class MarcaModel extends Model {

}

export const initMarcas = (db: Sequelize) => {
    db.define('Marca', {
    
    },{
        tableName: 'Marca',
        
        timestamps: true,
    }
    )
}

export class Marcas {

}