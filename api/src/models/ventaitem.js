'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VentaItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      VentaItem.belongsTo(models.Venta, {
        foreignKey: 'ventaId',
        as: 'venta',
      });
      VentaItem.belongsTo(models.Producto, {
        foreignKey: 'productoId',
        as: 'producto',
      });
    }
  }
  VentaItem.init({
    cantidad: DataTypes.INTEGER,
    codigo: DataTypes.STRING,
    nombre: DataTypes.STRING,
    valor: DataTypes.DECIMAL,
    categoria: DataTypes.STRING,
    marca: DataTypes.STRING,
    gestion: DataTypes.INTEGER,
    mes: DataTypes.INTEGER,
    subTotal: DataTypes.DECIMAL,
    unidad: DataTypes.STRING,
    ventaId: DataTypes.INTEGER,
    productoId: DataTypes.INTEGER,
    
  }, {
    sequelize,
    modelName: 'VentaItem',
  });
  return VentaItem;
};