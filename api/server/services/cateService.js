import db from '../../src/models';
import { Op as _Op, fn, col } from 'sequelize';


const { Cate } = db;

const itemsCates = (clienteId) =>{
    return new Promise((resolve,reject)=>{
       Cate.findAll({
        raw:true,
        nest:true,
        order: [['id','asc']],
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


const dataCates = (pag,num,parametro,prop,orden, clienteId) =>{
    return new Promise((resolve, reject)=>{
        let page = parseInt(pag)
        let der = num * page - num        
        Cate.findAndCountAll({
            raw:true,
            nest:true,
            offset: der,
            limit: num,
            order: [[prop,orden]],
            /*where: { nombre: { [_Op.iLike]: parametro } },                           */
            where: {
                [_Op.and]: [                                                                  
                  { nombre: { [_Op.iLike]: parametro } },
                  { clienteId: { [_Op.eq]: clienteId } }
                ]
              },
            attributes:['id','nombre','abreviacion','enabled']
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

const mostrarCate = (pky) =>{
    return new Promise((resolve,reject)=>{
        Cate.findByPk(pky,{
            raw:true,
            nest:true
        })
        .then((row)=> resolve( row ))
        .catch((reason)=> reject({message: reason.message}))
    })
}

const actualizarCate = (dato,datoId,pag,num,parametro,prop,orden, clienteId) =>{
    return new Promise((resolve,reject)=>{
        Cate.update(dato,{
            where: { id : Number(datoId)}
        })
        .then((row)=> {
            let page = parseInt(pag)
            let der = num * page - num        
            Cate.findAndCountAll({
                raw:true,
                nest:true,
                offset: der,
                limit: num,
                order: [[prop,orden]],
                where: {
                    [_Op.and]: [                                                                  
                      { nombre: { [_Op.iLike]: parametro } },
                      { clienteId: { [_Op.eq]: clienteId } }
                    ]
                  },                          
                attributes:['id','nombre','abreviacion','enabled']
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

const registrarCate = (dato,pag,num,clienteId) =>{
    return new Promise((resolve,reject)=>{
        Cate.create(dato)
        .then((row)=> {
            let page = parseInt(pag)
            let der = num * page - num        
            Cate.findAndCountAll({
                raw:true,
                nest:true,
                offset: der,
                limit: num,
                order: [['nombre','asc']],
                where: {
                    [_Op.and]: [                                                                  
                      { nombre: { [_Op.iLike]: '%' } },
                      { clienteId: { [_Op.eq]: clienteId } }
                    ]
                  },                         
                attributes:['id','nombre','abreviacion','enabled']
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


const _deleteCate = (datoId,pag,num,prop,orden,clienteId) =>{
    return new Promise((resolve,reject)=>{
        Cate.destroy({
            where : { id: Number(datoId)}
        })
        .then((row)=> {
            let page = parseInt(pag)
            let der = num * page - num        
            Cate.findAndCountAll({
                raw:true,
                nest:true,
                offset: der,
                limit: num,
                order: [[prop,orden]],
                where: {
                    [_Op.and]: [                                                                  
                      { nombre: { [_Op.iLike]: '%' } },
                      { clienteId: { [_Op.eq]: clienteId } }
                    ]
                  },                         
                attributes:['id','nombre','abreviacion','enabled']
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
    itemsCates,   
    dataCates,
    mostrarCate,    
    registrarCate,
    _deleteCate,
    actualizarCate  
}
