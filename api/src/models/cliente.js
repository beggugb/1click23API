'use strict';
const bcrypt = require('bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cliente.belongsTo(models.Categoria, {
        foreignKey: 'categoriaId',
        as: 'categoria',
      });
     
    }
    getFullName(){
      return [this.nombres,this.apellidos].join('');
    }
  }
  Cliente.init({    
    nombres: DataTypes.STRING,
    direccion: DataTypes.STRING,
    nit: {
      type: DataTypes.STRING,
      unique:true
    },
    telefono: DataTypes.STRING,
    rol: DataTypes.STRING,
    personaContacto: DataTypes.STRING,
    pais:DataTypes.STRING,
    ciudad:DataTypes.STRING,
    celular: DataTypes.STRING,
    web: DataTypes.STRING,
    filename: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    enabled: DataTypes.BOOLEAN,
    email: DataTypes.STRING,
    snum: DataTypes.INTEGER,
    valor: DataTypes.DECIMAL,
    portada: DataTypes.STRING,
    facebook: DataTypes.STRING,
    instagram: DataTypes.STRING,
    tiktok: DataTypes.STRING,
    latitude: DataTypes.DECIMAL,
    longitude: DataTypes.DECIMAL,
    tipo: DataTypes.STRING,
    icon: DataTypes.STRING,
    banner: DataTypes.STRING,
    slider: DataTypes.STRING,
    video: DataTypes.STRING,
    hinicio: DataTypes.STRING,
    hfin: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    views: DataTypes.INTEGER,
    tags: DataTypes.STRING,
    nivel: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    vencimiento: DataTypes.DATE,
    categoriaId: DataTypes.INTEGER,
    moneda: DataTypes.STRING,   
    labelMoneda: DataTypes.STRING,   
    
  }, {
    sequelize,
    modelName: 'Cliente',
  });
  /*Cliente.beforeSave((user, options) => {
    if (user.changed('password')) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    }
  });*/
  Cliente.prototype.comparePassword = function(passw, cb){
    bcrypt.compare(passw, this.password,(err,isMatch)=>{
      if(err){
        return cb(err);
      }
      cb(null,isMatch)
    })
  };
  return Cliente;
};