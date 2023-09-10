import db from '../../src/models';
import { Op as _Op, fn, col } from 'sequelize';
import { _fproductos, _fproducto, _fproductosInf } from '../../formats/productos/_datas'
const { Producto, SucursalItem, Cate } = db;


const listarProductos = (value) =>{    
    return new Promise((resolve, reject)=>{
        Producto.findAll({
            raw: true,
            nest: true,            
            order: [['nombre','asc']], 
            limit:10,
            where:{nombre:{[_Op.iLike]: value}},    
            attributes:['id','nombre','codigo','filename','cateId'],
            include:[
                {model:Cate,as:"cate",attributes:["id","nombre"]},                
            ]   
        })
        .then((rows)=>{
       
            let newItems = _fproductos(rows)
            resolve(newItems)
        })
        .catch((reason)=> reject({message: reason.message}))

    })
}

const dataProductos = (pag,num,prop,value,clienteId) =>{
    return new Promise((resolve, reject)=>{
        let page = parseInt(pag)
        let der = num * page - num        
        Producto.findAndCountAll({
            raw:true,
            nest:true,
            offset: der,
            limit: num,
            order: [['nombre','ASC']],
            /*where:{[prop]:{[_Op.iLike]: value}} , */
            where: {
                [_Op.and]: [                                                
                    {[prop]:{[_Op.iLike]: value}},                  
                    {clienteId:{[clienteId === 0 ? _Op.gt: _Op.eq]: clienteId}}
                ]
              }, 
            attributes:['id','nombre','codigo','filename','precioVenta','stock','cateId','clienteId'],
             include:[
                {model:Cate,as:"cate",attributes:["id","nombre"]},                
            ]
        })        
        .then((rows)=>{            
            let newData = _fproductos(rows.rows)
            resolve({
                paginas : Math.ceil(rows.count / num),
                pagina  : page,
                total   : rows.count,
                data    : newData
            })
    })
        .catch((reason)=> reject({message: reason.message}))
    })
}

const mostrarProducto = (pky) =>{
    return new Promise((resolve,reject)=>{
        Producto.findByPk(pky,{
            raw:true,
            nest:true            
        })
        .then((row)=> resolve( row ))
        .catch((reason)=> reject({message: reason.message}))
    })
}

const showProducto = (pky) =>{
    return new Promise((resolve,reject)=>{
        Producto.findByPk(pky,{
            raw:true,
            nest:true,
            include:[
                {model:Cate,as:"cate",attributes:["id","nombre"]}
            ]
           
        })
        .then((row)=> {
    
            let newDato = _fproducto(row)
            resolve(newDato)
        })
        .catch((reason)=> reject({message: reason.message}))
    })
}
const actualizarProducto = (dato,datoId) =>{
    return new Promise((resolve,reject)=>{        
        Producto.update(dato,{
            where: { id: Number(datoId) }
        })
        .then((row)=> {
            Producto.findByPk(datoId,{
                raw:true,
                nest:true                
            })
            .then((row)=> resolve( row ))
            .catch((reason)=> reject({message: reason.message}))
        })
        .catch((reason)=> reject({message: reason.message}))
        
    })
}

const registrarProducto = (dato) =>{
    return new Promise((resolve,reject)=>{
        const { codigo } = dato
        Producto.findOne({
            raw:true,
            nest:true,
            where: { codigo: codigo}
        })
        .then((row)=>{
            if(row)
            {
                reject({message: "existe un producto con el código "+ codigo})
            }else{
                Producto.create(dato)
                .then((row)=> resolve( row ))
                .catch((reason)=> reject({message: reason}))      
            }
        })
        .catch((reason)=> {
            console.log(reason)
        })

    })
}

const listaProductos = (pro,cat,mar) =>{
    return new Promise((resolve, reject)=>{               
        Producto.findAndCountAll({
            raw:true,
            nest:true,            
            order: [['nombre','ASC']],
            where: {
                [_Op.and]: [                                                
                  { id:{[pro === 0 ? _Op.gt: _Op.eq]: pro}},
                  { categoriaId:{[cat === 0 ? _Op.gt: _Op.eq]: cat}},
                  { marcaId:{[mar === 0 ? _Op.gt: _Op.eq]: mar}},                  
                ]
              }, 
              attributes:['id','nombre','codigo','filename','precioVenta','stock','cateId'],
           /* include:[
                {model:Categoria,as:"categoria",attributes:["id","nombre"]},                         
                {model:Industria,as:"industria",attributes:["id","nombre"]},
                {model:Marca,as:"marca",attributes:["id","nombre"]},
                {model:Unidad,as:"unidad",attributes:["id","nombre","abreviacion"]},
                {
                    model:SucursalItem,
                    as:"sucursalitem",
                    attributes:["id","stock"]
                },
            ]*/
        })        
        .then((rows)=>{                     
            let newData = _fproductosInf(rows.rows)
            resolve({                
                total   : rows.count,
                data    : newData.data,
                suma    : newData.stock
            })
    })
        .catch((reason)=> reject({message: reason.message}))
    })
}

const listarDispolible = (pag,num,value,categoriaId,clienteId) =>{
    return new Promise((resolve, reject)=>{        
        let page = parseInt(pag)
        let der = num * page - num        
        Producto.findAndCountAll({
            raw:true,
            nest:true,
            offset: der,
            limit: num,
            order: [['nombre','ASC']],            
            where: {
                [_Op.and]: [                                                
                    { nombre:{[_Op.iLike]: value}},       
                    { stock:{[_Op.gt]: 0}},                  
                    { cateId:{[categoriaId === 0 ? _Op.gt: _Op.eq]: categoriaId}},
                    { clienteId:{[_Op.eq]: clienteId}}
                ]
              }, 
            attributes:['id','nombre','codigo','filename','precioVenta','stock','cateId','clienteId'],
             include:[
                {model:Cate,as:"cate",attributes:["id","nombre"]},                
            ]
        })        
        .then((rows)=>{            
            let newData = _fproductos(rows.rows)
            resolve({
                paginas : Math.ceil(rows.count / num),
                pagina  : page,
                total   : rows.count,
                data    : newData
            })
    })
        .catch((reason)=> reject({message: reason.message}))
    })
}
module.exports = {    
    listarProductos,
    listaProductos,
    dataProductos,
    mostrarProducto,
    showProducto,
    actualizarProducto,
    registrarProducto,
    listarDispolible
}