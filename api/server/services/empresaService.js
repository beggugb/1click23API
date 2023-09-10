import db from '../../src/models';
import { Op as _Op} from 'sequelize';

const { Empresa } = db;

const singleEmpresa = (pky) =>{
    return new Promise((resolve,reject)=>{
        Empresa.findByPk(pky,{
            raw:true,
            nest:true,
            attributes:['id','nombre','moneda','labelMoneda','pais','automatico','filename','nit','telefono','direccion','registro'],
        })
        .then((row)=> resolve( row ))
        .catch((reason)=> reject({message: reason.message}))
    })
}

const mostrarEmpresa = (pky) =>{
    return new Promise((resolve,reject)=>{
        Empresa.findByPk(pky,{
            raw:true,
            nest:true
        })
        .then((row)=> resolve( row ))
        .catch((reason)=> reject({message: reason.message}))
    })
}
const actualizarEmpresa = (dato,datoId) =>{
    return new Promise((resolve,reject)=>{        
        Empresa.update(dato,{
            where: { id: Number(datoId) }
        })
        .then(()=> {
            Empresa.findByPk(datoId,{
                raw:true,
                nest:true                
            })
            .then((row)=> resolve( row ))
            .catch((reason)=> reject({message: reason.message}))
        })
        .catch((reason)=> reject({message: reason.message}))
    })
}

module.exports={
    singleEmpresa,
    mostrarEmpresa,
    actualizarEmpresa
}
