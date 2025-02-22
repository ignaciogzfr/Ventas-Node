import dotenv from 'dotenv';
import express from 'express';
import { ServiceModel, Ventas } from '../models';

dotenv.config({
    path: `./enviroments/.env.${process.env.NODE_ENV || 'local'}`
});

const port = process.env.PORT || 3000;


const app = express();
app.listen(port, () => {

    app.route('/getLast30Days').get(async (req, res) => {

        console.log('Conectandose a la DB??', dbInfo);
        const serviceModel = new ServiceModel(dbInfo);
        const ventasModel = new Ventas(serviceModel);

        const ventas = await ventasModel.getLast30Days();
        res.send(ventas);
    });

    console.log(`✅ Server running on port ${port}... ✅`);
});

const dbInfo = {
    database: String(process.env.DATABASE),
    username: String(process.env.DBUSER),
    password: String(process.env.DBPASS),
    host: String(process.env.DBHOST),
    port: Number(process.env.DBPORT),
};
