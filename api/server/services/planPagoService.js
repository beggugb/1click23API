import db from '../../src/models';
import { Op as _Op, fn, col } from 'sequelize';
import { _grafico } from '../../formats/notas/_datas'

const { PlanPago } = db;
const fechaHoy = new Date();
const gestion = fechaHoy.getFullYear()
const mes = fechaHoy.getMonth() + 1
const fechaCompra  = (new Date(fechaHoy + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]      


const dataPlan = (notaId) =>{
    return new Promise((resolve, reject)=>{             
        PlanPago.findAll({
            raw:true,
            nest:true,            
            order: [['id','asc']],            
            where:{ notaId: notaId}
        })        
        .then((rows)=> resolve(rows))
        .catch((reason)=> reject({message: reason.message}))
    })
}

const registrarPlan = (pky,data,tipo,credito) =>{    
    return new Promise((resolve,reject) =>{
        let newPlan = data.map((it)=>{
            let iok     = it
            iok.notaId  = pky
            iok.gestion = gestion
            iok.fechaPagado = credito ? null : it.fechaPago
            iok.estado  = credito ? 'pendiente' : 'pagado'
            iok.isVenta = tipo === 'venta' ? true : false
            return iok
        })        
       PlanPago.bulkCreate(newPlan,{individualHooks: true})
        .then((rows) => resolve({ message: 'compras registrada' }))
        .catch((reason)  => reject({ message: reason.message }))      
    })
}
const updatePlans = (dato,datoId) =>{
    return new Promise((resolve,reject)=>{
        PlanPago.update(dato,{
            where: { id : Number(datoId)}
        })
        .then((row)=> resolve( row ))
        .catch((reason)=> reject({message: reason.message}))
    })
}

const planConsolidado = (tipo,estado) =>{
    return new Promise((resolve, reject)=>{  
        PlanPago.findOne({
            raw:true,
            nest:true,        
            attributes: [[fn('sum', col('monto')), 'total']],         
            where: {[_Op.and]: [
                { gestion : {[_Op.eq]: gestion }},                
                { isVenta : tipo},
                { estado : estado}
            ]},
           })
           .then((row)=>{         
                PlanPago.findAll({
                    raw:true,
                    nest:true,                        
                    where: {[_Op.and]: [
                        { gestion : {[_Op.eq]: gestion }},                
                        { isVenta : tipo},
                        { estado : estado}
                    ]},
                    attributes: [[fn('sum', col('monto')), 'total'],'mes','estado'],         
                    group: ['mes','estado']                     
                })        
                .then((rows)=> {
                    let newItems = _grafico(rows)
                    resolve({_total:row.total,_items:newItems})
                })
                .catch((reason)=> reject({message: reason.message}))
            })
            .catch((reason)=> reject({message: reason.message}))  

    })
}

module.exports={    
    dataPlan,
    registrarPlan,
    updatePlans,
    planConsolidado
}

