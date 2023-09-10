'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Proceso extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // define association here
      Proceso.belongsTo(models.Usuario,{
        foreignKey: 'usuarioId',
        as: 'usuario'
      }) 
    }
  }
  Proceso.init({
    fecha: DataTypes.DATEONLY,
    proceso: DataTypes.TEXT,
    usuarioId: DataTypes.INTEGER,
    estado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Proceso',
  });
  return Proceso;
};