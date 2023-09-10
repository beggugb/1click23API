import db from '../../src/models';
import { Op as _Op, fn, col } from 'sequelize';

const { Proceso } = db;


const registrarProceso = (dato) =>{
    return new Promise((resolve,reject)=>{
        Proceso.create(dato)
        .then((row)=> resolve( row ))
        .catch((reason)=> reject({message: reason.message}))
    })
}

const procesosTotal = (pky) =>{
    return new Promise((resolve, reject)=>{
        Proceso.findOne({
            raw:true,
            nest: true,
            attributes: [[fn('count', col('id')), 'num']],
              where: {
                 [_Op.and]: [
                 { usuarioId: { [_Op.eq]: pky}},                 
                 { estado: true }]
            },
        })    
    .then((row)=>resolve(row))
    .catch((reason)=>reject({message:reason.message}))
    })
  }

  module.exports = {    
    procesosTotal,  
    registrarProceso
  }  