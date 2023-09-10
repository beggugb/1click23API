'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Favoritos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      clienteId: {
        type: Sequelize.INTEGER,
        references: { 
          model: 'Clientes', 
          key: 'id',
          as: 'clienteId'
        }        
      },
      usuarioId: {
        type: Sequelize.INTEGER,
        references: { 
          model: 'Usuarios', 
          key: 'id',
          as: 'usuarioId'
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
    await queryInterface.dropTable('Favoritos');
  }
};