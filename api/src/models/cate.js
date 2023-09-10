'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cate.belongsTo(models.Cliente,{
        foreignKey: 'clienteId',
        as: 'cliente'
      });
    }
  }
  Cate.init({
    nombre: DataTypes.STRING,
    icono: DataTypes.STRING,
    enabled: DataTypes.BOOLEAN,    
    abreviacion: DataTypes.STRING,
    clienteId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cate',
  });
  return Cate;
};