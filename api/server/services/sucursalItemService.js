import db from '../../src/models';
import { Op as _Op, fn, col } from 'sequelize';
import { _grafico, _fstocks, _fstocksInf } from '../../formats/stock/_datas'
const { SucursalItem, Producto, Categoria, Marca, Unidad } = db;
const fechaHoy = new Date();
const gestion = fechaHoy.getFullYear()
const mes = fechaHoy.getMonth() + 1
const fechaCompra  = (new Date(fechaHoy + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]      


const consolidadoExistencias = (gestion) =>{
    return new Promise((resolve,reject)=>{
        SucursalItem.findOne({
        raw:true,
        nest:true,        
        attributes: [[fn('count', col('id')), 'total']],         
        where: { gestion : gestion}
       })
       .then((row)=>{ 
        SucursalItem.findAll({ 
            raw: true,
            nest: true,
            attributes: [[fn('count', col('id')), 'total'],'categoria'],         
            group: ['categoria']
          })
          .then((rows) => {
            let newItems = _grafico(rows)
            resolve({s_total:row,s_items:newItems})
          })
          .catch((reason) => {
              reject({ message: reason.message })
          });
       }) 
       .catch((reason)=> reject({message: reason.message}))
    })
}
const  aumentarStock = (item, items)=>{             
    return new Promise((resolve,reject)=>{
        items.map((it,index)=>{      
          
            verifiStock(it.productoId,item.sucursalId)
            .then((itt)=>{                               
                if(!itt){
                    let newStock = {
                        stock : it.cantidad,    
                        sucursalId : item.sucursalId,   
                        costo : parseInt(it.cantidad) * parseFloat(it.valor),                              
                        gestion : gestion,
                        mes : mes,
                        productoId: it.productoId,
                        valor: it.valor,
                        valorc: it.valor, 
                        categoria: it.producto.categoria.nombre,
                        categoriaId: it.producto.categoria.id,
                        pcompra: it.valor,
                        pventa: it.producto.precioVenta,
                        acompra: it.cantidad,                        
                        ctcompra: parseInt(it.cantidad) * parseFloat(it.valor)    
                    }                    
                    create(newStock)                    
                }else{
                    let newStock = {
                        stock : parseInt(itt.stock) + parseInt(it.cantidad), 
                        sucursalId : item.sucursalId,    
                        costo : parseInt(itt.costo) + (parseInt(it.subTotal)),  
                        gestion : gestion,
                        mes : mes,                                
                        valor: it.valor,  
                        pcompra: it.valor,              
                        pventa: it.producto.precioVenta,          
                        acompra: parseInt(itt.acompra) + parseInt(it.cantidad),        
                        ctcompra: parseInt(itt.ctcompra) + (parseInt(it.cantidad) * parseFloat(it.valor))    
                    }                                                                         
                    update(newStock,itt.id)
                }                

            })   
             
            return 0
        })  
        resolve("aprobado") 
    })
}
const verifiStock = (pky,sucursalId) =>{
    return new Promise((resolve, reject)=>{             
        SucursalItem.findOne({
            raw:true,
            nest:true,                                    
            where: {[_Op.and]: [                                           
                { productoId : pky },
                { sucursalId : sucursalId }                
                ]}
        })        
        .then((row)=> resolve(row))
        .catch((reason)=> reject({message: reason.message}))
    })
}

const listarDispolible = (value,cod,cat) =>{        
    return new Promise((resolve, reject)=>{        
        SucursalItem.findAll({
            raw: true,
            nest: true,            
            order: [['id','asc']], 
            limit:10,
            where:{stock:{[_Op.gt]: 0}},                
            include:[
                {
                    model:Producto,as:"producto",
                    attributes:["id","nombre","filename","codigo","precioVenta"],
                    where: {[_Op.and]: [
                        { nombre:{[_Op.iLike]: value}},
                        { codigo:{[cod === '%' ? _Op.iLike: _Op.eq]: cod}},
                        { categoriaId:{[cat === 0 ? _Op.gt: _Op.eq]: cat}}
                    ]}, 
                    include:[
                        {model:Categoria,as:"categoria",attributes:["id","nombre"]},
                        {model:Marca,as:"marca",attributes:["id","nombre"]},
                        {model:Unidad,as:"unidad",attributes:["id","nombre"]}
                    ]
                },                
            ]              
        })
        .then((rows)=>{
            let newData = _fstocks(rows)
            resolve(newData)
        })
        .catch((reason)=> console.log(reason))

    })
}
const  disminuirStock = (item, items)=>{             
    return new Promise((resolve,reject)=>{
        items.map((it,index)=>{            
            verifiStock(it.productoId,item.sucursalId)
            .then((itt)=>{                
               let newStock = {
                   stock : parseInt(itt.stock) - parseInt(it.cantidad), 
                   sucursalId : item.sucursalId,    
                   costo : parseInt(itt.costo) - (parseInt(it.cantidad) * parseInt(itt.valor)),  
                   gestion : gestion,
                   mes : mes,                                
                   valor: it.valor,
                   valorc: itt.valor,                     
                   aventa: parseInt(itt.aventa) + parseInt(it.cantidad),        
                   ctventa: parseInt(itt.ctventa) + (parseInt(it.cantidad) * parseFloat(it.valor))                                  
                }                                                        
                update(newStock,itt.id)                
            })
            return 0
        })  
        resolve("aprobado") 
    })
}


const listarExistencias = (productoId,categoriaId,stock) =>{
    return new Promise((resolve,reject) =>{   
      let art = productoId === 0 || productoId === '' || productoId === undefined ? 0:productoId 
      let cat = categoriaId === 0 || categoriaId === '' || categoriaId === undefined ? 0:categoriaId 
            
      SucursalItem.findAndCountAll({
        raw: true,
        nest: true,                     
        where: {[_Op.and]: [                      
          { productoId: {[art === 0 ? _Op.gt: _Op.eq]: art }},
          { stock: {[stock ? _Op.gt: _Op.gte]: 0 }},
          { categoriaId: {[cat === 0 ? _Op.gt: _Op.eq]: cat}}
        ]},   
        include: [{ 
            model: Producto,  as: "producto",
            attributes:["id","nombre","codigo"]
            }] 
       })
        .then((rows)=> {                        
            let newData = _fstocksInf(rows.rows)
            resolve({
                total       : rows.count,
                data        : newData.data,                
                cantidad    : newData.cantidad
            })
        })  
        .catch((reason) => reject({ message: reason.message }))      
    })
  }
  const create = (dato) =>{
    return new Promise((resolve,reject)=>{
        SucursalItem.create(dato)
        .then((row)=> resolve( row ))
        .catch((reason)=> reject({message: reason.message}))
    })
}

const update = (dato,datoId) =>{
    return new Promise((resolve,reject)=>{
        SucursalItem.update(dato,{
            where: { id : Number(datoId)}
        })
        .then((row)=> resolve( row ))
        .catch((reason)=> reject({message: reason.message}))
    })
}


  const listarStock = (val,cod,cat) =>{        
    return new Promise((resolve, reject)=>{                    
        SucursalItem.findAll({
            raw: true,
            nest: true,            
            order: [['id','asc']], 
            limit:30,
            where:{stock:{[_Op.gt]: 0}},                
            include:[
                {
                    model:Producto,as:"producto",
                    attributes:["id","nombre","filename","codigo","precioVenta"],
                    where:{
                        [_Op.and]: [  
                        {nombre:{[_Op.iLike]: val}},
                        {codigo:{[cod === '%' ? _Op.iLike: _Op.eq]: cod}},
                        {categoriaId:{[cat === 0 ? _Op.gt: _Op.eq]: cat}},
                      ] 
                    }, 
                    include:[
                        {model:Categoria,as:"categoria",attributes:["id","nombre"]},
                        {model:Marca,as:"marca",attributes:["id","nombre"]},
                        {model:Unidad,as:"unidad",attributes:["id","nombre","abreviacion"]}
                    ]
                },                
            ]              
        })
        .then((rows)=>{
            let newData = _fstocks(rows)
            resolve(newData)
        })
        .catch((reason)=> reject({message: reason.message})) 

    })
}  

module.exports = {    
    consolidadoExistencias,
    aumentarStock,
    listarDispolible,
    disminuirStock,
    listarExistencias,
    listarStock
}