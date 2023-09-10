'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cajero extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cajero.init({
    icon: DataTypes.STRING,
    latitude: DataTypes.DECIMAL,
    longitude: DataTypes.DECIMAL,
    direccion: DataTypes.STRING,
    nombre: DataTypes.STRING,
    clienteId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cajero',
  });
  return Cajero;
};