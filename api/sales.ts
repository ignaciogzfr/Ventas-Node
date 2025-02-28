import dotenv from 'dotenv';
import express from 'express';
import { ServiceModel, Ventas } from '../models';

dotenv.config({
    path: `./enviroments/.env.${process.env.NODE_ENV || 'dev'}`
});

const port = process.env.PORT || 3000;


const app = express();
app.listen(port, () => {

    app.route('/getLast30Days').get(async (req, res) => {

        console.log('Conectandose a la DB??', dbInfo);
        const serviceModel = new ServiceModel(dbInfo);
        const ventasModel = new Ventas(serviceModel);

        // Last 30 Days
        const date = new Date('2024-03-31');
        const ventas: any[] = await ventasModel.getLast30Days(date);

        const TotalVentas = ventas.reduce((total, venta) => total + venta.Total, 0);
        const FechaMayorVenta = findFechaMayorVenta(ventas);
        const ProductoMasValorTotal = findProductoMasValorTotal(ventas);
        const LocalMayorVentas = findLocalMayorVentas(ventas);
        const MarcaMayorGanancias = findMarcaMayorGanancias(ventas);
        const MejorProductoPorLocal = findMejorProductoLocal(ventas);


        console.log('Rangos de Fecha de Busqueda', date.toISOString(), new Date(new Date().setDate(date.getDate() + 30)).toISOString());
        console.log('Numero Total de Ventas', TotalVentas);
        console.log('Fecha de la Mayor Venta en 30 Dias', FechaMayorVenta);
        console.log('Producto con Mayor Valor Total', ProductoMasValorTotal);
        console.log('Local con Mayor Ventas', LocalMayorVentas);
        console.log('Marca con Mayor Ganancias', MarcaMayorGanancias);
        console.log('Mejor Producto por Local', MejorProductoPorLocal);


        res.send({
            TotalVentas,
            FechaMayorVenta,
            ProductoMasValorTotal,
            LocalMayorVentas,
            MarcaMayorGanancias,
            MejorProductoPorLocal
        });
    });

    // console.log(`✅ Server running on host: http://localhost:${port} ✅`);
    console.log(`✅ (GET) getLast30Days: http://localhost:${port}/getLast30Days`);
});

const dbInfo = {
    database: String(process.env.DATABASE),
    username: String(process.env.DBUSER),
    password: String(process.env.DBPASS),
    host: String(process.env.DBHOST),
    port: Number(process.env.DBPORT),
};

const findFechaMayorVenta = (ventas: any) => {
    const mayorVenta = ventas.reduce((biggest, venta) => venta.Total > biggest.Total ? venta : biggest, ventas[0]);
    return {
        Fecha: mayorVenta.Fecha,
        TotalVenta: mayorVenta.Total,
        Local: mayorVenta.Local.Nombre,
        Direccion: mayorVenta.Local.Direccion,
        Detalle: mayorVenta.Detalles.map((detalle: any) => {
            return {
                Codigo: detalle.Producto.Codigo,
                Cantidad: detalle.Cantidad,
                TotalLinea: detalle.TotalLinea,
                Producto: detalle.Producto.Nombre,
                PrecioUnitario: detalle.PrecioUnitario,
                Marca: detalle.Producto.Marca,
                Modelo: detalle.Producto.Modelo
            };
        })
    };

};

const findProductoMasValorTotal = (ventas: any) => {
    const productos = new Map();
    for (const venta of ventas) {

        for (const detalle of venta.Detalles) {
            const { IDProducto } = detalle;
            const findProducto = productos.has(IDProducto);
            if (findProducto) {
                productos.set(IDProducto, {
                    producto: detalle.Producto,
                    ventas: productos.get(IDProducto).ventas + detalle.TotalLinea
                });
            } else {
                productos.set(IDProducto, {
                    producto: detalle.Producto,
                    ventas: detalle.TotalLinea
                });
            }
        }
    }

    const mejorProducto = Array.from(productos.values()).sort((productoA, productoB) => productoB.ventas - productoA.ventas)[0];

    return {
        Nombre: mejorProducto.producto.Nombre,
        Codigo: mejorProducto.producto.Codigo,
        Marca: mejorProducto.producto.Marca,
        Modelo: mejorProducto.producto.Modelo,
        Ventas: mejorProducto.ventas,
    };

};

const findMejorProductoLocal = (ventas: any): any[] => {
    const Locales = [];
    for (const venta of ventas) {
        const findLocal = Locales.find(local => local.local === venta.IDLocal);
        if (findLocal) {
            findLocal.ventas.push(venta);
        } else {
            Locales.push({
                local: venta.IDLocal,
                infoLocal: venta.Local,
                ventas: [venta]
            });
        }
    }
    for (const local of Locales) {
        local.mejorProducto = findProductoMasValorTotal(local.ventas);
    }
    Locales.sort((localA, localB) => localB.mejorProducto.Ventas - localA.mejorProducto.Ventas);
    return Locales.map((local) => { return { ...local.infoLocal.dataValues, MejorProducto: local.mejorProducto }; });
};

const findMarcaMayorGanancias = (ventas: any) => {
    const Marcas = new Map();
    for (const venta of ventas) {
        for (const detalle of venta.Detalles) {
            const { IDMarca } = detalle.Producto;
            const findMarca = Marcas.has(IDMarca);
            if (findMarca) {
                Marcas.set(IDMarca, {
                    Marca: detalle.Producto.Marca.Nombre,
                    Ventas: Marcas.get(IDMarca).Ventas + detalle.TotalLinea,
                    Costos: Marcas.get(IDMarca).Costos + detalle.Producto.Costo,
                    Ganancias: Marcas.get(IDMarca).Ganancias + (detalle.TotalLinea - detalle.Producto.Costo)
                });
            } else {
                Marcas.set(IDMarca, {
                    Marca: detalle.Producto.Marca.Nombre,
                    Ventas: detalle.TotalLinea,
                    Costos: detalle.Producto.Costo,
                    Ganancias: (detalle.TotalLinea - detalle.Producto.Costo)
                });
            }
        }
    }
    const MarcasArray = Array.from(Marcas.values()).sort((marcaA, marcaB) => marcaB.ganancias - marcaA.ganancias);
    return MarcasArray[0];
};

const findLocalMayorVentas = (ventas: any) => {
    const Locales = new Map();
    for (const venta of ventas) {
        const findLocal = Locales.has(venta.IDLocal);
        if (findLocal) {
            Locales.set(venta.IDLocal, {
                IDLocal: venta.IDLocal,
                ...venta.Local.dataValues,
                Total: Locales.get(venta.IDLocal).Total + venta.Total
            });
        } else {
            Locales.set(venta.IDLocal, {
                IDLocal: venta.IDLocal,
                ...venta.Local.dataValues,
                Total: venta.Total
            });
        }
    }
    const LocalesArray = Array.from(Locales.values()).sort((localA, localB) => localB.Total - localA.Total);
    return LocalesArray[0];
};
