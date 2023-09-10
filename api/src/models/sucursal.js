'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sucursal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Sucursal.belongsTo(models.Cliente,{
        foreignKey: 'clienteId',
        as :'cliente'
      })
    }
  }
  Sucursal.init({
    nombre: DataTypes.STRING,
    encargado: DataTypes.STRING,
    ciudad: DataTypes.STRING,
    estado: DataTypes.STRING,
    direccion: DataTypes.STRING,
    hinicio: DataTypes.STRING,
    hfin: DataTypes.STRING,
    hestado: DataTypes.BOOLEAN,
    telefono: DataTypes.STRING,
    celular: DataTypes.STRING,
    tipo: DataTypes.STRING,
    icon: DataTypes.STRING,
    latitude: DataTypes.DECIMAL,
    longitude: DataTypes.DECIMAL,    
    portada: DataTypes.STRING,
    clienteId: DataTypes.INTEGER    
  }, {
    sequelize,
    modelName: 'Sucursal',
  });
  return Sucursal;
};