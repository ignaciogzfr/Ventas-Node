import { Sequelize,  Model } from "sequelize";

export class LocalModel extends Model {

}

export const initSales = (db: Sequelize) => {
    db.define('Local', {
    
    },{
        tableName: 'Local',
        
        timestamps: true,
    }
    )
}

export class Locales  {

}