import db from '../../src/models';
import { Op as _Op, fn, col } from 'sequelize';


const { Categoria } = db;

const itemsCategorias = () =>{
    return new Promise((resolve,reject)=>{
       Categoria.findAll({
        raw:true,
        nest:true,
        order: [['id','asc']],
        attributes:[['nombre','label'],['id','value'],'icon'],
        where: { enabled:  true },
       })
       .then((rows)=>{ resolve(rows)}) 
       .catch((reason)=> reject({message: reason.message}))
    })
}


const dataCategorias = (pag,num,parametro,prop,orden) =>{
    return new Promise((resolve, reject)=>{
        let page = parseInt(pag)
        let der = num * page - num        
        Categoria.findAndCountAll({
            raw:true,
            nest:true,
            offset: der,
            limit: num,
            order: [['id','asc']],
            /*where: { nombre: { [_Op.iLike]: parametro } },                           */
            attributes:['id','nombre','icon','enabled'],
            where: {
                [_Op.and]: [                                                            
                  {nombre:{[_Op.iLike]: parametro}},
                  { id : {[_Op.gt]: 1}}                                          
                ]
              },
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

const mostrarCategoria = (pky) =>{
    return new Promise((resolve,reject)=>{
        Categoria.findByPk(pky,{
            raw:true,
            nest:true
        })
        .then((row)=> resolve( row ))
        .catch((reason)=> reject({message: reason.message}))
    })
}

const actualizarCategoria = (dato,datoId,pag,num,parametro,prop,orden) =>{
    return new Promise((resolve,reject)=>{
        Categoria.update(dato,{
            where: { id : Number(datoId)}
        })
        .then((row)=> {
            let page = parseInt(pag)
            let der = num * page - num        
            Categoria.findAndCountAll({
                raw:true,
                nest:true,
                offset: der,
                limit: num,
                order: [['id','asc']],
                /*where: { nombre: { [_Op.iLike]: parametro } },                           */
                attributes:['id','nombre','icon','enabled'],
                where: {
                    [_Op.and]: [                                                            
                      {nombre:{[_Op.iLike]: parametro}},
                      { id : {[_Op.gt]: 1}}                                          
                    ]
                  },
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

const registrarCategoria = (dato,pag,num) =>{
    return new Promise((resolve,reject)=>{
        Categoria.create(dato)
        .then((row)=> {
            let page = parseInt(pag)
            let der = num * page - num        
            Categoria.findAndCountAll({
                raw:true,
                nest:true,
                offset: der,
                limit: num,
                order: [['id','asc']],
                /*where: { nombre: { [_Op.iLike]: '%' } },                           */
                attributes:['id','nombre','icon','enabled'],
                where: {
                    [_Op.and]: [                                                            
                      {nombre:{[_Op.iLike]: parametro}},
                      { id : {[_Op.gt]: 1}}                                          
                    ]
                  },
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


const _deleteCategoria = (datoId,pag,num,prop,orden) =>{
    return new Promise((resolve,reject)=>{
        Categoria.destroy({
            where : { id: Number(datoId)}
        })
        .then((row)=> {
            let page = parseInt(pag)
            let der = num * page - num        
            Categoria.findAndCountAll({
                raw:true,
                nest:true,
                offset: der,
                limit: num,
                order: [['id','asc']],
                /*where: { nombre: { [_Op.iLike]: '%' } },                           */
                attributes:['id','nombre','icon','enabled'],
                where: {
                    [_Op.and]: [                                                            
                      {nombre:{[_Op.iLike]: '%'}},
                      { id : {[_Op.gt]: 1}}                                          
                    ]
                  },
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
    itemsCategorias,   
    dataCategorias,
    mostrarCategoria,    
    registrarCategoria,
    _deleteCategoria,
    actualizarCategoria  
}
