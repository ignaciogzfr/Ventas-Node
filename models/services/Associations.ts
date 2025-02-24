
const createAssociations = (models: any) => {

    models.Venta.belongsTo(models.Local, { foreignKey: 'IDLocal' });
    models.Local.hasMany(models.Venta, { foreignKey: 'IDLocal' });

    models.Productos.belongsTo(models.Marca, { foreignKey: 'IDMarca' });
    models.Marca.hasMany(models.Productos, { foreignKey: 'IDMarca' });

    models.VentaDetalles.belongsTo(models.Venta, { foreignKey: 'IDVenta', as: 'Detalles' });
    models.Venta.hasMany(models.VentaDetalles, { foreignKey: 'IDVenta', as: 'Detalles' });

    models.VentaDetalles.belongsTo(models.Productos, { foreignKey: 'IDProducto', as: 'Producto' });
    models.Productos.hasMany(models.VentaDetalles, { foreignKey: 'IDProducto', as: 'Producto' });

};

export default createAssociations;