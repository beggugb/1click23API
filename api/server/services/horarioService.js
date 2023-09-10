import db from '../../src/models';
import { Op as _Op, fn, col } from 'sequelize';


const { Horario } = db;

const dataHorarios = (pky) =>{
    return new Promise((resolve, reject)=>{        
        Horario.findAll({
            raw:true,
            nest:true,            
            order: [['id','asc']],
            where: { sucursalId: { [_Op.eq]: pky } },                           
            attributes:['id','dia','hinicio','hfin','sucursalId','tipo']
        })        
        .then((rows)=> resolve(rows))
        .catch((reason)=> reject({message: reason.message}))
    })
}

const actualizarHorario = (dato,datoId,pky) =>{
    return new Promise((resolve,reject)=>{
        Horario.update(dato,{
            where: { id : Number(datoId)}
        })
        .then((row)=> {
            Horario.findAll({
                raw:true,
                nest:true,            
                order: [['id','asc']],
                where: { sucursalId: { [_Op.eq]: pky } },                           
                attributes:['id','dia','hinicio','hfin','sucursalId','tipo']
            })        
            .then((rows)=> resolve(rows))
            .catch((reason)=> reject({message: reason.message}))
        })
        .catch((reason)=> reject({message: reason.message}))
    })
}

const registrarHorario = (pky) =>{
    return new Promise((resolve, reject)=>{
        let newData = [
            {dia:"Lunes",hinicio:"08:00",hfin:"18:00",sucursalId:pky,tipo:"normal"},
            {dia:"Marte",hinicio:"08:00",hfin:"18:00",sucursalId:pky,tipo:"normal"},
            {dia:"Miercoles",hinicio:"08:00",hfin:"18:00",sucursalId:pky,tipo:"normal"},
            {dia:"Jueves",hinicio:"08:00",hfin:"18:00",sucursalId:pky,tipo:"normal"},
            {dia:"Viernes",hinicio:"08:00",hfin:"18:00",sucursalId:pky,tipo:"normal"},
            {dia:"Sabado",hinicio:"08:00",hfin:"18:00",sucursalId:pky,tipo:"normal"},
            {dia:"Domingo",hinicio:"08:00",hfin:"18:00",sucursalId:pky,tipo:"normal"}
        ]
        Horario.bulkCreate(newData,{individualHooks: true})
        .then((rows) => resolve({ message: 'Ventas registrada' }))
        .catch((reason)  => reject({ message: reason.message })) 
    })
}



module.exports = {            
    dataHorarios,
    registrarHorario,
    actualizarHorario
}
