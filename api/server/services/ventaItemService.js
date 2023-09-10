import db from '../../src/models';
import { Op as _Op, fn, col } from 'sequelize';
const { VentaItem, Producto, Categoria } = db;
import { _fVendidos } from '../../formats/ventas/_datas'

const fechaHoy = new Date();
const gestion = fechaHoy.getFullYear()
const mes = fechaHoy.getMonth() + 1
const fechaCompra  = (new Date(fechaHoy + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]      


const listaVentaItem = (pky) =>{
    return new Promise((resolve, reject)=>{             
        VentaItem.findAll({
            raw:true,
            nest:true,              
            order: [['id','desc']],
            attributes:['id','nombre','valor','cantidad','codigo','unidad','categoria','marca','ventaId','productoId','subTotal'],            
            where:{ ventaId: pky},
            include:[
                {
                    model:Producto,as:"producto",attributes:["id","nombre","precioVenta"],
                    include:[
                        {
                            model:Categoria,as:"categoria",attributes:["id","nombre"]
                            
                        }]

                }] 
        })         
        .then((rows)=> resolve(rows))
        .catch((reason)=> reject({message: reason.message}))
    })
}


const _deleteVentaItem = (datoId) =>{
    return new Promise((resolve,reject)=>{
        VentaItem.destroy({
            where : { ventaId: Number(datoId)}
        })
        .then((row)=> resolve( row ))
        .catch((reason)=> reject({message: reason.message}))
    })
}

const registraVentaItems = (data) =>{
    return new Promise((resolve,reject) =>{
       VentaItem.bulkCreate(data,{individualHooks: true})
        .then((rows) => resolve({ message: 'Ventas registrada' }))
        .catch((reason)  => reject({ message: reason.message }))      
    })
}


const listaVendidos = (cat,type,desde,hasta,productoId) =>{
    return new Promise((resolve, reject)=>{        
        VentaItem.findAll({
            raw:true,
            nest:true,                   
            where: {
                [_Op.and]: [            
                { cantidad:{[_Op.gt]: 0 }},
                { gestion: gestion },
                /*{ estado: "aprobado" },*/
                { createdAt: {[_Op.between]: [desde, hasta]}},
                ]
            },
            attributes: [[fn('sum', col('cantidad')), 'sumCantidad'],[fn('sum', col('subTotal')), 'total'],'productoId','categoria'],
            group: ['productoId','producto.id','categoria'],            
            include:[
                {   model:Producto,as:"producto",
                    attributes:["id","nombre","codigo","precioVenta","categoriaId"],
                    where: {
                        [_Op.and]: [            
                        { categoriaId:{[cat === 0 ? _Op.gt: _Op.eq]: cat}},
                        { id :{[productoId === 0 ? _Op.gt: _Op.eq]: productoId}}                        
                        ]
                    },
                },
            ],            
        })        
        .then((rows) => {          
            let newData = _fVendidos(rows,type)
            resolve(newData)
        })        
        .catch((reason)=> reject({message: reason.message}))
    })
}

module.exports={    
    listaVentaItem,
    _deleteVentaItem,
    registraVentaItems,
    listaVendidos    
}

