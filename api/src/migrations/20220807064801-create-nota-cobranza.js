'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('NotaCobranzas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nro: {
        type: Sequelize.STRING
      },
      tipo: {
        type: Sequelize.STRING
      },
      montoTotal: {
        type: Sequelize.DECIMAL
      },
      pagoTotal: {
        type: Sequelize.DECIMAL
      },
      saldoTotal: {
        type: Sequelize.DECIMAL
      },
      fechaVencimiento: {
        type: Sequelize.DATE
      },
      cuotas: {
        type: Sequelize.INTEGER
      },
      isVenta: {
        type: Sequelize.BOOLEAN
      },
      detalle: {
        type: Sequelize.STRING
      },
      ventaId: {
        type: Sequelize.INTEGER,
             
      },   
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('NotaCobranzas');
  }
};