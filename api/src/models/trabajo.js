'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trabajo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Trabajo.belongsTo(models.Cliente,{
        foreignKey: 'clienteId',
        as: 'cliente'
      }); 
    }
  }
  Trabajo.init({
    titulo: DataTypes.STRING,
    vencimiento: DataTypes.STRING,
    tipo: DataTypes.STRING,
    tiempo: DataTypes.STRING,
    ciudad: DataTypes.STRING,
    requerimientos: DataTypes.STRING,
    caracteristicas: DataTypes.STRING,
    enlace: DataTypes.STRING,
    clienteId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Trabajo',
  });
  return Trabajo;
};