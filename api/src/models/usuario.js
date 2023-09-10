'use strict';
const bcrypt = require('bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        
    }
    getFullname() {
      return [this.nombres, this.apellidos].join(' ');
    }
  }
  Usuario.init({
    nombres: DataTypes.STRING,
    apellidos: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    filename: DataTypes.STRING,
    token: DataTypes.STRING,
    numTareas: DataTypes.INTEGER,
    munMensajes: DataTypes.INTEGER,            
    ciudad: DataTypes.STRING,
    telefono: DataTypes.STRING,
    celular: DataTypes.STRING,
    direccion: DataTypes.STRING,
    enabled: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  Usuario.beforeSave((user, options) => {
    if (user.changed('password')) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    }
  });
  Usuario.prototype.comparePassword = function(passw, cb){
    bcrypt.compare(passw, this.password,(err,isMatch)=>{
      if(err){
        return cb(err);
      }
      cb(null,isMatch)
    })
  };
 
  return Usuario;
};