'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Clientes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombres: {
        type: Sequelize.STRING
      },
      apellidos: {
        type: Sequelize.STRING
      },
      direccion: {
        type: Sequelize.STRING
      },
      tipo: {
        type: Sequelize.STRING
      },
      nit: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      nombreNit: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.BOOLEAN
      },
      filename: {
        type: Sequelize.STRING
      },
      telefono: {
        type: Sequelize.STRING
      },
      codigo: {
        type: Sequelize.STRING
      },
      pais: {
        type: Sequelize.STRING
      },
      ciudad: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      web: {
        type: Sequelize.STRING
      },
      observaciones: {
        type: Sequelize.STRING
      },
      codPostal: {
        type: Sequelize.STRING
      },
      tipoInteres: {
        type: Sequelize.STRING
      },
      filenameCi: {
        type: Sequelize.STRING
      },
      filenameNit: {
        type: Sequelize.STRING
      },
      grupo: {
        type: Sequelize.STRING
      },
      personaContacto: {
        type: Sequelize.STRING
      },
      cuentaBanco: {
        type: Sequelize.STRING
      },
      celular: {
        type: Sequelize.STRING
      },
      latitude: {
        type: Sequelize.DECIMAL
      },
      longitude: {
        type: Sequelize.DECIMAL
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
    await queryInterface.dropTable('Clientes');
  }
};