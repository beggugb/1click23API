import db from '../../src/models';
import { Op as _Op, fn, col } from 'sequelize';


const { Trabajo } = db;

const itemsTrabajos = (clienteId) =>{
    return new Promise((resolve,reject)=>{
       Trabajo.findAll({
        raw:true,
        nest:true,
        order: [['nombre','asc']],
        attributes:[['nombre','label'],['id','value']],
        /*where: { enabled:  true },*/
        where: {
            [_Op.and]: [                                                
                { enabled:  true },
                {clienteId:{[clienteId === 0 ? _Op.gt: _Op.eq]: clienteId}},
            ]
          }, 
       })
       .then((rows)=>{ resolve(rows)}) 
       .catch((reason)=> reject({message: reason.message}))
    })
}


const dataTrabajos = (pag,num,parametro,clienteId) =>{
    return new Promise((resolve, reject)=>{
        let page = parseInt(pag)
        let der = num * page - num        
        Trabajo.findAndCountAll({
            raw:true,
            nest:true,
            offset: der,
            limit: num,
            order: [["id","ASC"]],
            /*where: { nombre: { [_Op.iLike]: parametro } },                           */
            where: {
                [_Op.and]: [                                                                  
                  { titulo: { [_Op.iLike]: parametro } },
                  { clienteId: { [_Op.eq]: clienteId } }
                ]
              },
            /*attributes:['id','nombre','abreviacion','enabled']*/
        })        
        .then((rows)=> resolve({
            paginas : Math.ceil(rows.count / num),
            pagina  : page,
            total   : rows.count,
            data    : rows.rows
        }))
        .catch((reason)=> reject({message: reason.message}))
    })
}

const mostrarTrabajo = (pky) =>{
    return new Promise((resolve,reject)=>{
        Trabajo.findByPk(pky,{
            raw:true,
            nest:true
        })
        .then((row)=> resolve( row ))
        .catch((reason)=> reject({message: reason.message}))
    })
}

const actualizarTrabajo = (dato,datoId,pag,num,parametro,clienteId) =>{
    return new Promise((resolve,reject)=>{
        Trabajo.update(dato,{
            where: { id : Number(datoId)}
        })
        .then((row)=> {
            let page = parseInt(pag)
            let der = num * page - num        
            Trabajo.findAndCountAll({
                raw:true,
                nest:true,
                offset: der,
                limit: num,
                order: [['vencimiento','desc']],
                where: {
                    [_Op.and]: [                                                                  
                      { titulo: { [_Op.iLike]: parametro } },
                      { clienteId: { [_Op.eq]: clienteId } }
                    ]
                  },                          
                /*attributes:['id','nombre','abreviacion','enabled']*/
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

const registrarTrabajo = (dato,pag,num,clienteId) =>{
    return new Promise((resolve,reject)=>{
 
        Trabajo.create(dato)
        .then((row)=> {
            let page = parseInt(pag)
            let der = num * page - num        
            Trabajo.findAndCountAll({
                raw:true,
                nest:true,
                offset: der,
                limit: num,
                order: [['id','asc']],
                where: {
                    [_Op.and]: [                                                                  
                      { titulo: { [_Op.iLike]: '%' } },
                      { clienteId: { [_Op.eq]: clienteId } }
                    ]
                  },                         
                /*attributes:['id','nombre','abreviacion','enabled']*/
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


const _deleteTrabajo = (datoId,pag,num,clienteId) =>{
    return new Promise((resolve,reject)=>{
        Trabajo.destroy({
            where : { id: Number(datoId)}
        })
        .then((row)=> {
            let page = parseInt(pag)
            let der = num * page - num        
            Trabajo.findAndCountAll({
                raw:true,
                nest:true,
                offset: der,
                limit: num,
                order: [["id","asc"]],
                where: {
                    [_Op.and]: [                                                                  
                      { titulo: { [_Op.iLike]: '%' } },
                      { clienteId: { [_Op.eq]: clienteId } }
                    ]
                  },                         
                /*attributes:['id','nombre','abreviacion','enabled']*/
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
    itemsTrabajos,   
    dataTrabajos,
    mostrarTrabajo,    
    registrarTrabajo,
    _deleteTrabajo,
    actualizarTrabajo  
}
