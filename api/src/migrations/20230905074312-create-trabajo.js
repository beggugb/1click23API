'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Trabajos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titulo: {
        type: Sequelize.STRING
      },
      vencimiento: {
        type: Sequelize.STRING
      },
      tipo: {
        type: Sequelize.STRING
      },
      tiempo: {
        type: Sequelize.STRING
      },
      ciudad: {
        type: Sequelize.STRING
      },
      requerimientos: {
        type: Sequelize.STRING
      },
      carcateristicas: {
        type: Sequelize.STRING
      },
      enlace: {
        type: Sequelize.STRING
      },
      clienteId: {
        type: Sequelize.INTEGER,
          references:{
            model: 'Clientes',
            key :'id',
            as: 'clienteId'
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
    await queryInterface.dropTable('Trabajos');
  }
};