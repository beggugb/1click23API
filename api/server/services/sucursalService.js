import db from '../../src/models';
import { Op as _Op, fn, col } from 'sequelize';

import { dataHorarios, registrarHorario } from './horarioService'
import { _sucursales,_sucursals } from '../../formats/clientes/_datas'

const { Sucursal } = db;

const itemsSucursals = () =>{
    return new Promise((resolve,reject)=>{
       Sucursal.findAll({
        raw:true,
        nest:true,
        order: [['nombre','asc']],
        attributes:[['nombre','label'],['id','value']],        
       })
       .then((rows)=>{ resolve(rows)}) 
       .catch((reason)=> reject({message: reason.message}))
    })
}


const dataSucursals = (pag,num,clienteId,latitude,longitude) =>{
    return new Promise((resolve, reject)=>{
        let page = parseInt(pag)
        let der = num * page - num        
        Sucursal.findAndCountAll({
            raw:true,
            nest:true,
            offset: der,
            limit: num,
            order: [['id','asc']],
            where: { clienteId: { [_Op.eq]: clienteId } },                           
            /*attributes:['id','nombre','direccion','estado','ciudad','clienteId','tipo']*/
        })        
        .then((rows)=> {
            let newData = {
                paginas : Math.ceil(rows.count / num),
                pagina  : page,
                total   : rows.count,
                data    : _sucursales(rows.rows,latitude,longitude)
            }
            resolve(newData)
        })
        .catch((reason)=> reject({message: reason.message}))
    })
}

const mostrarSucursal = (pky) =>{
    return new Promise((resolve,reject)=>{
        Sucursal.findByPk(pky,{
            raw:true,
            nest:true
        })
        .then((row)=> {
            /*dataHorarios(pky)
            .then((rows)=>{*/
                resolve({item:row,items:rows})
            /*})*/
        })
        .catch((reason)=> reject({message: reason.message}))
    })
}

const actualizarSucursal = (dato,datoId,pag,num,clienteId) =>{
 
    return new Promise((resolve,reject)=>{
        Sucursal.update(dato,{
            where: { id : Number(datoId)}
        })
        .then((row)=> {
            let page = parseInt(pag)
            let der = num * page - num        
            Sucursal.findAndCountAll({
                raw:true,
                nest:true,
                offset: der,
                limit: num,
                order: [['id','asc']],
                where: { clienteId: { [_Op.eq]: clienteId } },                        
                /*attributes:['id','nombre','encargado','ciudad']*/
            })        
            .then((rows)=> {
                let newData = {
                    paginas : Math.ceil(rows.count / num),
                    pagina  : page,
                    total   : rows.count,
                    data    : _sucursals(rows.rows)
                }
                resolve(newData)
            })
            .catch((reason)=> reject({message: reason.message}))
        })
        .catch((reason)=> reject({message: reason.message}))
    })
}

const registrarSucursal = (dato) =>{
    return new Promise((resolve,reject)=>{
        const { pagina, num, clienteId } = dato
        Sucursal.create(dato)
        .then((row)=> {
            registrarHorario(row.id)
            .then((xrow)=>{
                let page = parseInt(pagina)
                let der = num * page - num        
                Sucursal.findAndCountAll({
                    raw:true,
                    nest:true,
                    offset: der,
                    limit: num,
                    order: [['id','asc']],
                    where: { clienteId: { [_Op.eq]: clienteId } },   
                    /*attributes:['id','nombre','estado','ciudad','direccion','clienteId','tipo']                                       */
                })        
                .then((rows)=> {
                    let newData = {
                        paginas : Math.ceil(rows.count / num),
                        pagina  : page,
                        total   : rows.count,
                        data    : _sucursals(rows.rows)
                    }
                    resolve(newData)
                })
                .catch((reason)=> reject({message: reason.message}))
            })
            .catch((reason)=> reject({message: reason.message}))
        })
        .catch((reason)=> reject({message: reason.message}))
    })
}



const _deleteSucursal = (dato) =>{
    return new Promise((resolve,reject)=>{
        const { clienteId, sucursalId, pagina, num } = dato
        Sucursal.destroy({
            where : { id: Number(sucursalId)}
        })
        .then((row)=> {
            let page = parseInt(pagina)
            let der = num * page - num        
            Sucursal.findAndCountAll({
                raw:true,
                nest:true,
                offset: der,
                limit: num,
                order: [['id','asc']],
                where: { clienteId: { [_Op.eq]: clienteId } },   
                /*attributes:['id','nombre','estado','ciudad','direccion','clienteId','tipo'] */
            })        
            .then((rows)=> resolve({
                paginas : Math.ceil(rows.count / num),
                pagina  : page,
                total   : rows.count,
                data    : rows.rows
            }))
            .catch((reason)=> reject({message: reason.message}))
        })
        .catch((reason)=> reject({message: reason.message}))
    })
}

module.exports = {        
    itemsSucursals,  
    registrarSucursal,
    _deleteSucursal,
    actualizarSucursal, 
    dataSucursals,
    mostrarSucursal  
}
