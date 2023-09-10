'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PlanPagos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cuota: {
        type: Sequelize.INTEGER
      },
      monto: {
        type: Sequelize.DECIMAL
      },
      estado: {
        type: Sequelize.STRING
      },
      fechaPago: {
        type: Sequelize.DATE
      },
      fechaPagado: {
        type: Sequelize.DATE
      },
      mes: {
        type: Sequelize.INTEGER
      },
      isVenta: {
        type: Sequelize.BOOLEAN
      },
      gestion: {
        type: Sequelize.INTEGER
      },
      notaId: {
        type: Sequelize.INTEGER,
        references: { 
          model: 'NotaCobranzas', 
          key: 'id',
          as: 'notaId'
        }        
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
    await queryInterface.dropTable('PlanPagos');
  }
};