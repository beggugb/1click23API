'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Empresas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      direccion: {
        type: Sequelize.STRING
      },
      telefono: {
        type: Sequelize.STRING
      },
      web: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      filename: {
        type: Sequelize.STRING
      },
      nit: {
        type: Sequelize.STRING
      },
      registro: {
        type: Sequelize.STRING
      },
      moneda: {
        type: Sequelize.STRING
      },
      labelMoneda: {
        type: Sequelize.STRING
      },
      pais: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Empresas');
  }
};