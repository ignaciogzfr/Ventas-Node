import { Sequelize } from "sequelize";
import { initSales } from "../entities/Local";
import { initMarcas } from "../entities/Marca";
import { initProductos } from "../entities/Producto";
import { initVentaDetalles } from "../entities/VentaDetalle";
import { initVentas } from "../entities/Venta";

const initializeModels = (db: Sequelize) => {
    initVentas(db);
    initSales(db);
    initMarcas(db);
    initProductos(db);
    initVentaDetalles(db);
};

export default initializeModels