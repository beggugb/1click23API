'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Venta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Venta.belongsTo(models.Cliente,{
        foreignKey: 'clienteId',
        as: 'cliente'
      })
      Venta.belongsTo(models.Sucursal,{
        foreignKey: 'sucursalId',
        as: 'sucursal'
      })
      Venta.belongsTo(models.Usuario,{
        foreignKey: 'usuarioId',
        as: 'usuario'
      })
      Venta.hasOne(models.NotaCobranza,{
        foreignKey: 'ventaId',
        as: 'notacobranza'
      })
      Venta.hasOne(models.VentaItem,{
        foreignKey: 'ventaId',
        as: 'ventaitem'
      })
    }
  }
  Venta.init({
    nro: DataTypes.STRING,
    /*fechaVenta: DataTypes.DATE,*/
    fechaVenta: {
      type: DataTypes.DATE,
      defaultValue: new Date(),      
    },
    tipo: DataTypes.STRING,
    nroItems: DataTypes.INTEGER,
    total: DataTypes.DECIMAL,
    observaciones: DataTypes.STRING,
    estado: DataTypes.STRING,
    clients: DataTypes.STRING,
    nroPagos: DataTypes.INTEGER,
    fechaAprobacion: DataTypes.DATE,
    gestion: DataTypes.INTEGER,
    isVenta: DataTypes.BOOLEAN,
    mes: DataTypes.INTEGER,
    subTotal: DataTypes.DECIMAL,
    iva: DataTypes.DECIMAL,
    descuento: DataTypes.DECIMAL,
    impuesto: DataTypes.DECIMAL,
    totalGeneral: DataTypes.DECIMAL,
    origen: DataTypes.STRING,
    clienteId: DataTypes.INTEGER,
    sucursalId: DataTypes.INTEGER,
    usuarioId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Venta',
  });
  return Venta;
};