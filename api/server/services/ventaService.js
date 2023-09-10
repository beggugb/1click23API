import db from '../../src/models';
import { Op as _Op, fn, col } from 'sequelize';
import { _grafico, _fclienteEstados, _fcobrosInf, _fCobranzasInf, _fDeudasInf, _fventasInf, _fventas } from '../../formats/ventas/_datas'

const  { Venta, VentaItem, NotaCobranza, PlanPago, Cliente, Usuario } = db;
import { listaVentaItem, _deleteVentaItem, registraVentaItems } from './ventaItemService'
import { mostrarNota, registrarNota } from './notaService'
import { disminuirStock, listarStock } from './sucursalItemService'


const fechaHoy = new Date();
const gestion = fechaHoy.getFullYear()
const mes = fechaHoy.getMonth() + 1

const fV  = (new Date(fechaHoy))
const fechaVenta   = (new Date(fV + 'UTC')).toISOString()   
const fechaGestion = gestion+"-01-01"
const finGestion   = gestion+"-12-31"

const consolidadoVentas = () =>{
    return new Promise((resolve,reject)=>{
       Venta.findOne({
        raw:true,
        nest:true,        
        attributes: [[fn('sum', col('totalGeneral')), 'total']],         
        where: { gestion : gestion}
       })
       .then((row)=>{ 
        Venta.findAll({ 
            raw: true,
            nest: true,
            attributes: [[fn('sum', col('totalGeneral')), 'total'],'mes'],         
            group: ['mes']
          })
          .then((rows) => {
            let newItems = _grafico(rows)
            resolve({v_total:row.total,v_items:newItems})
          })
          .catch((reason) => {
              reject({ message: reason.message })
          });
       }) 
       .catch((reason)=> reject({message: reason.message}))
    })
}
const estCliente = (pky) =>{
    return new Promise((resolve,reject)=>{       
       Venta.findAndCountAll({
        raw:true,
        nest:true,                
        attributes:["id","clients","clienteId"],               
        where: { clienteId: {[pky === 0 ? _Op.gt : _Op.eq ]: pky }},        
        include:[
            { model:NotaCobranza,as:"notacobranza",
              attributes:["id","detalle","montoTotal","pagoTotal","saldoTotal","fechaVencimiento"],              
            }                
        ],
       })
       .then((rows)=>{         
            let newData = _fclienteEstados(rows.rows)            
                resolve({                
                    total   : rows.count,                    
                    data    : newData.data,
                    pTotal  : newData.pTotal,
                    pSaldo  : newData.pSaldo,
                    pPago   : newData.pPago
            })            
       }) 
       .catch((reason)=> reject({message: reason.message}))
    })
}


const dataVentas = (pag,num,prop,value,desde,hasta) =>{
    return new Promise((resolve, reject)=>{               
        let fdesde = fechaGestion 
        let fhasta = finGestion

        if(desde !== 0 && hasta !== 0){
            fdesde = desde
            fhasta = hasta
        }
        let page = parseInt(pag)
        let der = num * page - num        
        Venta.findAndCountAll({
            raw:true,
            nest:true,
            offset: der,
            limit: num,
            order: [['id','DESC']],
            attributes:['id','fechaVenta','observaciones','estado','totalGeneral','clients','isVenta','tipo'],           
            include:[    
                { model:NotaCobranza,as:"notacobranza",attributes:["id","pagoTotal","saldoTotal"]}],
                where: {[_Op.and]: [
                {[prop]:{[_Op.iLike]: value}},
                { fechaVenta: { [_Op.between]: [fdesde, fhasta]}}
            ]}            
        })        
        .then((rows)=> resolve({
            paginas : Math.ceil(rows.count / num),
            pagina  : page,
            total   : rows.count,
            data    : _fventas(rows.rows)
        }))
        .catch((reason)=> reject({message: reason.message}))
    })
}

const mostrarVenta = (pky,tipo) =>{
    return new Promise((resolve,reject)=>{       
        if(tipo === 'single'){
            Venta.findByPk(pky,{
                raw:true,
                nest:true,           
            })
            .then((row)=> {                           
                listaVentaItem(pky)                
                .then((rows)=> resolve({row:row,rows:rows}))                
                .catch((reason)=> reject({message: reason.message}))    
            })
            .catch((reason)=> reject({message: reason.message}))
        }else{
            Venta.findByPk(pky,{
                raw:true,
                nest:true,           
            })
            .then((row)=> {           
                Promise.all([
                    listaVentaItem(pky),
                    mostrarNota(pky,'ventaId')
                ])                                
                .then(([rows,nota])=> resolve({row:row,rows:rows,nota:nota.nota,plan:nota.plan}))                
                .catch((reason)=> reject({message: reason.message}))    
            })
            .catch((reason)=> reject({message: reason.message}))
        }        
    })
}

const registraVenta = (dato) =>{
    return new Promise((resolve,reject)=>{
        const { usuarioId } = dato
        let newItem = {
            fechaVenta  : fechaVenta,
            estado      : 'pendiente',
            nroPagos    : 0,        
            gestion     : gestion,
            mes         : mes,
            tipo        : 'venta',
            origen      : 'nueva venta',            
            total       : 0,
            totalGeneral: 0,
            nroItems    : 0,
            subTotal    : 0,       
            clients     : 'sn',
            sucursalId  : 1,
            clienteId   : 1,
            usuarioId   : usuarioId,            
            observaciones: 'Nueva orden de venta'
        }  
        Venta.create(newItem)
        .then((row)=> {
            let page = parseInt(1)
            let der = 12 * 1 - 12        
            Venta.findAndCountAll({
                raw:true,
                nest:true,
                offset: der,
                limit: 12,
                order: [['id','DESC']],
                /*attributes:['id','fechaVenta','observaciones','estado','totalGeneral','clients'],
                where:{'observaciones':{[_Op.iLike]: '%'}} */
                attributes:['id','fechaVenta','observaciones','estado','totalGeneral','clients','isVenta','tipo'],           
                include:[    
                        { model:NotaCobranza,as:"notacobranza",attributes:["id","pagoTotal","saldoTotal"]}],
                where:{'clients':{[_Op.iLike]: '%'}}                         
            })        
            .then((rows)=> resolve({
                paginas : Math.ceil(rows.count / 12),
                pagina  : page,
                total   : rows.count,
                data    : _fventas(rows.rows)
            }))
            .catch((reason)=> reject({message: reason.message}))
          /*  resolve( row )*/
        })        
        .catch((reason)=> reject({message: reason.message}))
    })
}

const _deleteVenta = (pag,num,datoId) =>{
    return new Promise((resolve,reject)=>{        
        let page = parseInt(pag)
        let der = num * page - num  
        _deleteVentaItem(datoId)
        .then((xx)=>{
            Venta.destroy({
                where : { id: Number(datoId)}
            })
            .then((row)=>{
                Venta.findAndCountAll({
                    raw:true,
                    nest:true,
                    offset: der,
                    limit: num,
                    order: [['id','DESC']],
                    attributes:['id','fechaVenta','observaciones','estado','totalGeneral','clients','isVenta','tipo'],           
                include:[    
                        { model:NotaCobranza,as:"notacobranza",attributes:["id","pagoTotal","saldoTotal"]}],
                where:{'clients':{[_Op.iLike]: '%'}}                         
                })        
                .then((rows)=> resolve({
                    paginas : Math.ceil(rows.count / num),
                    pagina  : page,
                    total   : rows.count,
                    data    : _fventas(rows.rows)
                }))
                .catch((reason)=> reject({message: reason.message}))
            })
            .catch((reason)=> reject({message: reason.message}))
        })
        .catch((reason)=> reject({message: reason.message}))
     })
}

const actualizarVenta = (dato,datos,datoId) =>{
    return new Promise((resolve,reject)=>{
        Venta.update(dato,{where: { id : Number(datoId)}})
        .then((xrow)=> {
            _deleteVentaItem(datoId)
            .then((yrow)=> {
                registraVentaItems(datos)
                    .then((yrows) =>{                        
                        Venta.findByPk(datoId,{
                            raw:true,
                            nest:true,           
                        })
                        .then((row)=> {                           
                          listaVentaItem(datoId)
                          .then((rows)=>{                            
                            resolve({row:row,rows:rows})
                          })
                          .catch((reason)=> reject({message: reason.message}))                
                        })
                        .catch((reason)=> reject({message: reason.message}))                        
                    })
                    .catch((reason)  => reject({ message: reason.message }))  
            })
            .catch((reason)=> reject({message: reason.message}))            
        })
        .catch((reason)=> reject({message: reason.message}))
    })
}
const aprobarVenta = (pky,data,nroPagos,credito) =>{
    return new Promise((resolve,reject)=>{      
        Venta.findByPk(pky,{
            raw:true,
            nest:true,           
        })
        .then((row)=> {                                       
            if(row.estado === "pendiente"){
            listaVentaItem(pky)                
            .then((rows)=> {
                registrarNota('venta',row,data,nroPagos,credito)
                    .then((xnota)=>{
                    disminuirStock(row,rows)
                        .then((xx)=>{
                            let iok = {
                                id: row.id,
                                estado : 'aprobado'
                            }
                            Venta.update(iok,{
                                where: { id : Number(row.id)}
                            })
                            .then((xx)=>{
                            Venta.findAndCountAll({
                                raw:true,
                                nest:true,
                                offset: 0,
                                limit: 12,
                                order: [['id','DESC']],
                                attributes:['id','fechaVenta','observaciones','estado','totalGeneral','clients'],            
                                include:[    
                                    { model:NotaCobranza,as:"notacobranza",attributes:["id","pagoTotal","saldoTotal"]}],
                                where:{'clients':{[_Op.iLike]: '%'}} 
                            })        
                            .then((rows)=> resolve({
                                paginas : Math.ceil(rows.count / 12),
                                pagina  : 1,
                                total   : rows.count,
                                data    : _fventas(rows.rows)
                            }))
                            .catch((reason)=> reject({message: reason.message}))

                            })  
                        }) 
                    })
                    .catch((reason)=> reject({message: reason.message}))                    
            })                
            .catch((reason)=> reject({message: reason.message}))    
        }else{
            reject({message: "la venta ya esta aprobada"})
        }            
        })
        .catch((reason)=> reject({message: reason.message}))

    })
}


const _vencimientosCobros = (desde,hasta,est,pky) =>{    
    return new Promise((resolve,reject)=>{  
        let fdesde = fechaGestion 
        let fhasta = finGestion

        if(desde !== 0 && hasta !== 0){
            fdesde = desde
            fhasta = hasta
        }
       Venta.findAndCountAll({
        raw:true,
        nest:true,        
        attributes:["id","clients","clienteId"],               
        /*where: { clients: { [Op.iLike]: nombre } },     */
        where: { clienteId: { [pky === 0 ? _Op.gt : _Op.eq]: pky } },  
        include:[
            { model:NotaCobranza,as:"notacobranza",
              attributes:["id","detalle"],
              required: true,
              include:[
                { model:PlanPago,as:"planpago",
                  attributes:["id","cuota","monto","estado","fechaPago","fechaPagado","mes","gestion"],                  
                  order: [['fechaPago','asc']],       
                  where: {
                    [_Op.and]: [            
                      { estado: { [_Op.iLike]: est } },     
                      { fechaPago: { [_Op.between]: [fdesde, fhasta]}},                                                   
                    ]
                  },
                }
            ],  
            }                
        ],
       })
       .then((rows)=>{ 
            let newData = _fcobrosInf(rows.rows) 
            resolve({                
                total   : rows.count,
                data    : newData.data,
                pTotal  : newData.pTotal
            })
       }) 
       .catch((reason)=> reject({message: reason.message}))
    })
}


const estadoCliente = (pky) =>{
    return new Promise((resolve,reject)=>{       
       Venta.findAndCountAll({
        raw:true,
        nest:true,                
        attributes:["id","clients","clienteId"],                       
        where: {
            [_Op.and]: [            
              { clienteId: {[pky === 0 ? _Op.gt : _Op.eq ]: pky }}, 
              /*{ fechaVenta: { [Op.between]: [fdesde, fhasta]}},                             */
            ]
          },

        include:[
            { model:NotaCobranza,as:"notacobranza",            
              attributes:["id","detalle","montoTotal","pagoTotal","saldoTotal","fechaVencimiento"],
              where:{ montoTotal : {[_Op.gt] :0  }}              
            }                
        ],
       })
       .then((rows)=>{ 
            let newData = _fCobranzasInf(rows.rows)
            Cliente.findByPk(pky,{
                raw:true,
                nest:true,
                attributes:[
                    "id","nombres","apellidos","labels","direccion","tipo","nit","nombreNit","filename","telefono","pais","ciudad","email"]
            })
            .then((clien)=>{
                resolve({                
                    total   : rows.count,
                    cliente : clien,
                    data    : newData.data,
                    pTotal  : newData.pTotal,
                    pSaldo  : newData.pSaldo,
                    pPago   : newData.pPago
                })
            })
       }) 
       .catch((reason)=> reject({message: reason.message}))
    })
}


const ventasInforme = (desde,hasta,icliente,estado) =>{
    return new Promise((resolve,reject)=>{   
        let fdesde = fechaGestion 
        let fhasta = finGestion

        if(desde !== 0 && hasta !== 0){
            fdesde = desde
            fhasta = hasta
        } 
        Venta.findOne({
            raw:true,
            nest:true,        
            attributes: [[fn('sum', col('nroItems')), 'cantidad'],[fn('sum', col('totalGeneral')), 'total']],         
            where: {[_Op.and]: [
                { gestion : {[_Op.eq]: gestion }},            
                { clienteId : {[icliente === 0 ? _Op.gt : _Op.eq  ]: icliente }},
                { estado    : {[_Op.eq ]: estado }},
                { fechaVenta: {[_Op.between]: [fdesde, fhasta]}}
            ]}
           })
           .then((row)=>{     
                Venta.findAll({ 
                    raw: true,
                    nest: true,
                    order: [['fechaVenta','asc']], 
                    attributes:['id','fechaVenta','clients','estado','totalGeneral','nroItems','clienteId','usuarioId','observaciones'],  
                    include:[{model:Usuario,as:'usuario',attributes:['id','nombres','username']}],                  
                    where: {[_Op.and]: [
                        { gestion : {[_Op.eq]: gestion }},                        
                        { clienteId : {[icliente === 0 ? _Op.gt : _Op.eq  ]: icliente }},
                        { estado    : {[_Op.eq ]: estado }},
                        { fechaVenta: {[_Op.between]: [fdesde, fhasta]}}
                    ]} 
                })
                .then((rows) => {            
                    resolve({item:row,data:rows})
                })
                .catch((reason) => {
                    reject({ message: reason.message })
                });
           })
           .catch((reason)=> reject({message: reason.message}))  

    })
}


const maxVentas = (desde,hasta,productoId) =>{
    return new Promise((resolve, reject)=>{        
        let fdesde = fechaGestion 
        let fhasta = finGestion

        if(desde !== 0 && hasta !== 0){
            fdesde = desde
            fhasta = hasta
        }           
            Venta.findAll({
                    raw:true,
                    nest:true,                    
                    attributes:['id','fechaVenta','estado','totalGeneral','nroItems'],                  
                    include:[{
                        model:VentaItem,as:'ventaitem',
                        attributes:['id','cantidad','valor','subTotal','nombre','categoria','productoId'],  
                        where: {
                            [_Op.and]: [                                                      
                            { createdAt: {[_Op.between]: [fdesde, fhasta]}},
                            { productoId : {[productoId === 0 ? _Op.gt : _Op.eq  ]: productoId }},                        
                            ]}                            
                    }],
                    where: {
                        [_Op.and]: [                          
                        { gestion: gestion },
                        { estado: "aprobado" }                                        
                        ]
                    }            
                })        
                .then((rows) => {
                    let newData = _fventasInf(rows)
                    resolve(newData)
                })
                .catch((reason)=> reject({message: reason.message}))     
    })
}  


const registrarVentaTpdv = (dato) =>{
    return new Promise((resolve,reject)=>{
        const {  item, items, clienteId, cliente, usuarioId, cajaId } = dato
        let newItem = {
            fechaVenta  : fechaVenta,
            estado      : 'aprobado',
            nroPagos    : 0,        
            gestion     : gestion,
            mes         : mes,
            tipo        : 'tpdv',
            origen      : 'nueva venta de caja',            
            total       : item.totalGeneral,            
            totalGeneral: item.totalGeneral,
            nroItems    : item.nroItems,
            subTotal    : item.totalGeneral,        
            clients     : cliente? cliente : "s/n",
            sucursalId  : 1,
            clienteId   : clienteId,
            usuarioId   : usuarioId,            
            observaciones: 'Nueva venta tdpv ' + fechaVenta
        }  
        Venta.create(newItem)
        .then((row)=> {
            let newItems = items.map((it)=>{
                let iok= it
                iok.ventaId = row.id
                iok.gestion = gestion
                iok.mes     = mes
                return iok
            })
            registraVentaItems(newItems)
                .then((yrows) =>{
                    let newPlan =[{
                        cuota:1,
                        monto: item.totalGeneral,
                        estado: 'pagado',
                        fechaPago: fechaHoy,
                        fechaPagado: fechaHoy,
                        mes: mes,
                        isVenta: true,
                        gestion: gestion
                    }]
                    registrarNota('venta',row,newPlan,1)
                    .then((xnota)=>{
                        resolve('ok')
                    })
                    .catch((reason)=> reject({message: reason.message}))

                })
                .catch((reason)=> reject({message: reason.message}))
        })        
        .catch((reason)=> reject({message: reason.message}))
    })
}
module.exports = { 
    consolidadoVentas,
    estCliente,
    dataVentas,
    mostrarVenta,
    registraVenta,
    _deleteVenta,
    actualizarVenta,
    aprobarVenta,
    _vencimientosCobros,
    estadoCliente,
    ventasInforme,
    maxVentas,
    registrarVentaTpdv
    
}