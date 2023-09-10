import db from '../../src/models';
import { Op as _Op, fn, col } from 'sequelize';

const {  Comprobante } = db;
import { _deleteAsientos, registrarAsientos, listarAsientos, _delAsientos } from './asientoService'

const fechaHoy = new Date();
const gestion = fechaHoy.getFullYear()
const gestions = gestion.toString()
const mes = fechaHoy.getMonth() + 1
const fechaComprobante  = (new Date(fechaHoy + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]      

const fechaGestion = gestion+"-01-01"
const finGestion   = gestion+"-12-31"

const registrarAutomatico = (ncomprobante,nasientos,tipo) => {      
    return new Promise((resolve, reject) => {    
      let numero = 1;
        Comprobante.findOne({
          raw:true,
          nest:true,
          where:{ tipo: tipo },
          limit:1,
          order: [['id','desc']]
        })
        .then((comp)=>{          
          if(comp){
            numero = comp.num + 1
          }
            let nnc = ncomprobante
            nnc.num  = numero 
            nnc.tipo = tipo 
            Comprobante.create(nnc)
            .then((row) => {        
                registrarAsientos(nasientos,row.id)
                .then(([xrow])=>{
                  resolve(xrow)
                })
              .catch((reason)=> reject({message: reason.message}))
            })         
        })
        .catch((reason)=> reject({message: reason.message}))  
    });
}
const dataComprobantes = (pag,num,gestion,prop,nombre,desde,hasta) =>{    
  let fdesde = fechaGestion 
  let fhasta = finGestion
      if(desde !== 0 && hasta !== 0){
          fdesde = desde
          fhasta = hasta
      }
return new Promise((resolve, reject)=>{
    let page = parseInt(pag)
    let der = num * page - num        
    Comprobante.findAndCountAll({
        raw:true,
        nest:true,
        offset: der,
        limit: num,
        order: [['id','DESC']],          
        where: {
          [_Op.and]: [            
            { gestion: gestion },            
            { [prop]: { [_Op.iLike]: nombre } },
            { fecha: { [_Op.between]: [fdesde, fhasta]}},
          ]
        },

        attributes:['id','num','tipo','estado','fecha','glosa','total','gestion']
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

const mostrarComprobante = (pky) =>{
  return new Promise((resolve,reject)=>{
     Comprobante.findByPk(pky,{
          raw:true,
          nest:true
      })
      .then((row)=> {
        listarAsientos(pky)
          .then((rows)=>{
              resolve({row:row,rows:rows})
          })
      })
      .catch((reason)=> reject({message: reason.message}))
  })
}

const actualizarComprobante = (dato,datoId,data) =>{
  return new Promise((resolve,reject)=>{
    _deleteAsientos(datoId)      
    .then((x)=>{
      Comprobante.update(dato,{
        where: { id : Number(datoId)}
    })
    .then((xrow)=> {
      Promise.all([
        registrarAsientos(data,datoId),
        Comprobante.findByPk(datoId,{ raw:true,nest:true})
      ])
      .then(([rows,row])=>{
        resolve({row:row,rows:rows})
      })
      .catch((reason)=> reject({message: reason.message}))
      
    })
    .catch((reason)=> reject({message: reason.message}))
    })        
    .catch((reason)=> reject({message: reason.message}))
  })
}


const registrarComprobante = (usuarioId,tipo,ciudad) =>{
  return new Promise((resolve,reject) =>{  
    let numero = 1;
    Comprobante.findOne({
      raw:true,
      nest:true,
      where:{ tipo: tipo },
      limit:1,
      order: [['id','desc']]
    })
    .then((comp)=>{          
        if(comp){
          numero = comp.num + 1
        }
        let newItem = {
          fecha: fechaComprobante,
          tipo: tipo,
          estado: "pendiente",
          label: "registro comprobante",
          glosa: "registro comprobante",
          ciudad: ciudad,
          impuesto: 0,
          subTotal: 0,
          total: 0,
          gestion: gestion,
          tdc: 0,
          tDebe: 0,
          tHaber:0,        
          num: numero,
          usuarioId: usuarioId,        
        }
        Comprobante.create(newItem)
          .then((row) => {
            let page = parseInt(1)
            let der = 12 * page - 12
            Comprobante.findAndCountAll({
                raw:true,
                nest:true,
                offset: der,
                limit: 12,
                order: [['id','DESC']],              
                where: {
                  [_Op.and]: [            
                    { gestion: gestions },            
                    { glosa: { [_Op.iLike]: '%' } }
                  ]
                },
      
                attributes:['id','num','tipo','estado','fecha','glosa','total','gestion']
            })        
            .then((rows)=> resolve({
                paginas : Math.ceil(rows.count / 12),
                pagina  : page,
                total   : rows.count,
                data    : rows.rows
            }))
            .catch((reason)=> reject({message: reason.message}))
          })
        .catch((reason)  => reject({ message: reason.message }))
    })
    .catch((reason)  => reject({ message: reason.message }))  
    
  })
}

const borrarComprobante = (pky) =>{
  return new Promise((resolve,reject) =>{      
    _delAsientos(pky) 
    .then((xn)=>{
      Comprobante.destroy({ where: { id: Number(pky) } })
      .then((row) => {
        let page = parseInt(1)
        let der = 12 * page - 12
        Comprobante.findAndCountAll({
            raw:true,
            nest:true,
            offset: der,
            limit: 12,
            order: [['id','DESC']],              
            where: {
              [_Op.and]: [            
                { gestion: gestions },            
                { glosa: { [_Op.iLike]: '%' } }
              ]
            },
  
            attributes:['id','num','tipo','estado','fecha','glosa','total','gestion']
        })        
        .then((rows)=> resolve({
            paginas : Math.ceil(rows.count / 12),
            pagina  : page,
            total   : rows.count,
            data    : rows.rows
        }))
        .catch((reason)=> reject({message: reason.message}))
      })
    .catch((reason)  => reject({ message: reason.message }))
    })
    .catch((reason)  => reject({ message: reason.message })) 
  })
}


const aprobarComprobante = (dato,pky) =>{
  return new Promise((resolve,reject) =>{      
          Comprobante.update(dato,{
            where: { id : Number(pky)}
          })
          .then((row) => {
            let page = parseInt(1)
            let der = 12 * page - 12
            Comprobante.findAndCountAll({
                raw:true,
                nest:true,
                offset: der,
                limit: 12,
                order: [['id','DESC']],              
                where: {
                  [_Op.and]: [            
                    { gestion: gestions },            
                    { glosa: { [_Op.iLike]: '%' } }
                  ]
                },
      
                attributes:['id','num','tipo','estado','fecha','glosa','total','gestion']
            })        
            .then((rows)=> resolve({
                paginas : Math.ceil(rows.count / 12),
                pagina  : page,
                total   : rows.count,
                data    : rows.rows
            }))
            .catch((reason)=> reject({message: reason.message}))          
    })
    .catch((reason)  => reject({ message: reason.message }))  
    
  })
}

module.exports = {   
  registrarAutomatico,
  dataComprobantes,
  mostrarComprobante,
  actualizarComprobante,
  registrarComprobante,
  borrarComprobante,
  aprobarComprobante
}