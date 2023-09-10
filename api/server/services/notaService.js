import db from '../../src/models';
import { Op as _Op, fn, col } from 'sequelize';


const { NotaCobranza } = db;
import { dataPlan, registrarPlan, updatePlans } from './planPagoService'
const fechaHoy = new Date();
const gestion = fechaHoy.getFullYear()
const mes = fechaHoy.getMonth() + 1
const fechaCompra  = (new Date(fechaHoy + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]      

const mostrarNota = (pky,tipo) =>{
    return new Promise((resolve,reject)=>{
        NotaCobranza.findOne({
            raw:true,
            nest:true,            
            where:{[tipo]:{[_Op.eq]: pky}}
        })
        .then((row)=> {            
            if(row){
              dataPlan(row.id)
              .then((plan)=>{                
                resolve({nota:row,plan:plan})   
              })
              .catch((reason)=> reject({message: reason.message})) 
            }else{                  
              resolve({nota:row,plan:null})
            }
        })
        .catch((reason)=> reject({message: reason.message}))
    })
}

const registrarNota = (tipo,dato,data,nroPagos,credito) =>{
  return new Promise((resolve,reject)=>{

      let newNota = {        
          nro       : dato.id,
          fechaVencimiento: fechaCompra,
          tipo      : tipo,
          montoTotal: dato.totalGeneral,
          pagoTotal : credito ? 0 : dato.totalGeneral,
          saldoTotal: credito ? dato.totalGeneral : 0 ,
          cuotas    : nroPagos,
          isVenta   : tipo === 'venta' ? true : false,
          detalle   : "Nota de " + tipo,
          compraId  : tipo === 'compra' ? dato.id : null,
          ventaId   : tipo === 'venta' ? dato.id : null,
        }     
        NotaCobranza.create(newNota)
            .then((row)=> {
               registrarPlan(row.id,data,tipo,credito)
               .then((xplan)=>{
                    resolve('ok')
                })                                       
               .catch((reason)=> reject({message: reason.message}))
            })        
            .catch((reason)=> reject({message: reason.message}))
  })
}

const actualizarNotaItem = (dato,pky) =>{
  return new Promise((resolve,reject)=>{        
      const { notaId, monto, tipo } = dato          
      updatePlans(dato,pky)
      .then((xrow)=>{
          NotaCobranza.findByPk(notaId,{
              raw:true,
              nest:true
          })
          .then((xnota)=> {                                
              let iok = xnota
                  iok.pagoTotal  = parseFloat(xnota.pagoTotal) + parseFloat(monto)
                  iok.saldoTotal = parseFloat(xnota.saldoTotal) - parseFloat(monto)    

                  NotaCobranza.update(iok,{
                      where: { id : Number(notaId)}
                  })
                  .then((yrow)=> {
                      NotaCobranza.findByPk(notaId,{
                          raw:true,
                          nest:true
                      })
                      .then((row)=> {                              
                          if(row){
                            dataPlan(row.id)
                            .then((plan)=>{
                              resolve({nota:row,plan:plan})   
                            })
                            .catch((reason)=> reject({message: reason.message})) 
                          }else{                  
                            resolve({nota:row,plan:null})
                          }
                      })
                      .catch((reason)=> reject({message: reason.message}))
                  })
                  .catch((reason)=> reject({message: reason.message}))
                  
          })
          .catch((reason)=> reject({message: reason.message}))
      })
      
      .catch((reason)=> reject({message: reason.message}))

  })
}


module.exports = {        
    mostrarNota,
    registrarNota,
    actualizarNotaItem      
}

