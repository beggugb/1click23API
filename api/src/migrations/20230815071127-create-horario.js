'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Horarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dia: {
        type: Sequelize.STRING
      },
      hinicio: {
        type: Sequelize.STRING
      },
      hfin: {
        type: Sequelize.STRING
      },    
      sucursalId: {
        type: Sequelize.INTEGER,
        references: { 
          model: 'Sucursals', 
          key: 'id',
          as: 'sucursalId'
        }        
      },
      tipo: {
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
    await queryInterface.dropTable('Horarios');
  }
};