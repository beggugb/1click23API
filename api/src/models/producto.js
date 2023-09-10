'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here      
       
      Producto.belongsTo(models.Cliente,{
        foreignKey: 'clienteId',
        as: 'cliente'
      });  
      Producto.belongsTo(models.Cate,{
        foreignKey: 'cateId',
        as: 'cate'
      });  
      Producto.hasOne(models.SucursalItem,{
        foreignKey: 'productoId',
        as: 'sucursalitem'
      }) 

    }
  }
  Producto.init({
    nombre: DataTypes.STRING,
    nombreCorto: DataTypes.STRING,
    codigo: DataTypes.STRING,
    estado: DataTypes.BOOLEAN,
    tipo: DataTypes.STRING,
    inCatalogo: DataTypes.BOOLEAN,
    inOferta: DataTypes.BOOLEAN,
    precioVenta: DataTypes.DECIMAL,
    precioCosto: DataTypes.DECIMAL,
    filename: DataTypes.STRING,
    colores: DataTypes.STRING,
    precioOferta: DataTypes.DECIMAL,
    pDescuento: DataTypes.INTEGER,
    medida: DataTypes.STRING,        
    subcategoria: DataTypes.STRING,
    lote: DataTypes.STRING,
    vencimiento: DataTypes.DATE,    
    categoria: DataTypes.STRING,        
    nivel: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    clienteId: DataTypes.INTEGER,
    cateId:  DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Producto',
  });
  return Producto;
};