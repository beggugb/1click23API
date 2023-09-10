'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlanPago extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PlanPago.belongsTo(models.NotaCobranza,{
        foreignKey: 'notaId',
        as: 'nota'
      })
    }
  }
  PlanPago.init({
    cuota: DataTypes.INTEGER,
    monto: DataTypes.DECIMAL,
    estado: DataTypes.STRING,
    fechaPago: DataTypes.DATE,
    fechaPagado: DataTypes.DATE,
    mes: DataTypes.INTEGER,
    isVenta: DataTypes.BOOLEAN,
    gestion: DataTypes.INTEGER,
    notaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PlanPago',
  });
  return PlanPago;
};