'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Productos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      nombreCorto: {
        type: Sequelize.STRING
      },
      codigo: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.BOOLEAN
      },
      tipo: {
        type: Sequelize.STRING
      },
      inCatalogo: {
        type: Sequelize.BOOLEAN
      },
      inOferta: {
        type: Sequelize.BOOLEAN
      },
      precioVenta: {
        type: Sequelize.DECIMAL
      },
      precioCosto: {
        type: Sequelize.DECIMAL
      },
      filename: {
        type: Sequelize.STRING
      },
      colores: {
        type: Sequelize.STRING
      },
      precioOferta: {
        type: Sequelize.DECIMAL
      },
      pDescuento: {
        type: Sequelize.INTEGER
      },
      medida: {
        type: Sequelize.STRING
      },      
      subcategoria: {
        type: Sequelize.STRING
      },
      lote: {
        type: Sequelize.STRING
      },
      vencimiento: {
        type: Sequelize.DATE
      },
      nivel: {
        type: Sequelize.STRING
      },
      descripcion: {
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
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Productos');
  }
};