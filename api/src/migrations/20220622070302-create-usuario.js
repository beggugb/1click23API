'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Usuarios', {
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
      token: {
        type: Sequelize.STRING
      },
      rol: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      filename: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      numTareas: {
        type: Sequelize.INTEGER
      },
      munMensajes: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Usuarios');
  }
};