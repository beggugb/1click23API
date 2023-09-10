'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sucursals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      encargado: {
        type: Sequelize.STRING
      },
      ciudad: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.STRING
      },
      direccion: {
        type: Sequelize.STRING
      },
      hinicio: {
        type: Sequelize.STRING
      },
      hfin: {
        type: Sequelize.STRING
      },
      hestado: {
        type: Sequelize.BOOLEAN
      },
      telefono: {
        type: Sequelize.STRING
      },
      celular: {
        type: Sequelize.STRING
      },
      tipo: {
        type: Sequelize.STRING
      },
      icon: {
        type: Sequelize.STRING
      },
      portada: {
        type: Sequelize.STRING
      },
      latitude: {
        type: Sequelize.DECIMAL
      },
      longitude: {
        type: Sequelize.DECIMAL
      },
      clienteId: {        
        type: Sequelize.INTEGER,
          references:{
            model : 'Clientes',
            key: 'id',
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
    await queryInterface.dropTable('Sucursals');
  }
};