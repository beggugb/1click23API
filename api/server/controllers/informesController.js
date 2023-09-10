const { verifiDBNull ,verifiDBEmpty } = require('../../functions/env')
import { listarExistencias } from "../services/sucursalItemService.js"
import { listaProductos } from "../services/productoService" 
import { listaVendidos } from "../services/ventaItemService"
import { _vencimientosCobros, ventasInforme, maxVentas, estadoCliente } from "../services/ventaService"



const i_existencias = (req,res) =>{        
    const { productoId, categoriaId, stock } = req.body; 
    listarExistencias(productoId,categoriaId,stock)
    .then((rows) => {            
        res.status(200).send({result:rows})
    })
    .catch((reason) => {               
      res.status(400).send({ message: reason });
    });   
}

const i_productos = (req,res) =>{     
    const { productoId,categoriaId, marcaId  } = req.body;
    let iproducto  = verifiDBEmpty(productoId)
    let icategoria = verifiDBEmpty(categoriaId)
    let imarca     = verifiDBEmpty(marcaId)
    
    listaProductos(iproducto,icategoria,imarca)
        .then((rows) => {            
            res.status(200).send({result:rows})
        })
        .catch((reason) => {         
        console.log(reason)
        res.status(400).send({ message: reason });
        });
}
const i_movimientos = (req,res) =>{        
    const { categoriaId, type, tip, desde, hasta, productoId  } = req.body;             
    var dDesde = new Date(desde)
    var dHasta = new Date(hasta) 
    var fdesde = (new Date(dDesde + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 
    var fhasta = (new Date(dHasta + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 
    let iproducto = verifiDBEmpty(productoId)    
    let icategoria = verifiDBEmpty(categoriaId) 

    if(tip === 'vendidos'){
        listaVendidos(icategoria,type,fdesde,fhasta,iproducto)
        .then((rows) => {            
            res.status(200).send({result:rows})
        })
        .catch((reason) => {         
        console.log(reason)
        res.status(400).send({ message: reason });
        });
    }else{
      listaComprados(icategoria,type,fdesde,fhasta,iproducto)
        .then((rows) => {            
            res.status(200).send({result:rows})
        })
        .catch((reason) => {         
        console.log(reason)
        res.status(400).send({ message: reason });
        });
    }
}


const i_cobros = (req,res) =>{        
    const { estado, desde, hasta, clienteId } = req.body;     
    var iclienteId = verifiDBEmpty(clienteId)
    let fdesde = 0 
    let fhasta = 0

    if((desde !== 0 && desde !== '0') && (hasta !== 0 && hasta !== '0')){
        var dDesde = new Date(desde)  
        var dHasta = new Date(hasta)     
        fdesde = (new Date(dDesde + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 
        fhasta = (new Date(dHasta + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]
    }else{        
        fdesde = 0 
        fhasta = 0
    }
    
    _vencimientosCobros(fdesde,fhasta,estado,iclienteId)
        .then((rows) => {                        
            res.status(200).send({result:rows})
        })
        .catch((reason) => {         
        console.log(reason)
        res.status(400).send({ message: reason });
        });
   
}

const i_pagos = (req,res) =>{        
    const { estado, desde, hasta, proveedorId } = req.body;     
    var iproveedorId   = verifiDBEmpty(proveedorId)  
    
    
    let fdesde = 0 
    let fhasta = 0

    if((desde !== 0 && desde !== '0') && (hasta !== 0 && hasta !== '0')){
        var dDesde = new Date(desde)  
        var dHasta = new Date(hasta)     
        fdesde = (new Date(dDesde + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 
        fhasta = (new Date(dHasta + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]
    }else{        
        fdesde = 0 
        fhasta = 0
    }
    
    _vencimientosPagos(fdesde,fhasta,estado,iproveedorId)
        .then((rows) => {                        
            res.status(200).send({result:rows})
        })
        .catch((reason) => {         
        console.log(reason)
        res.status(400).send({ message: reason });
        });
   
}

const i_cajas = (req,res) =>{        
    const { desde, hasta, usuarioId, estado  } = req.body;     
    var dDesde = new Date(desde)
    var dHasta = new Date(hasta) 
    var fdesde = (new Date(dDesde + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 
    var fhasta = (new Date(dHasta + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 
    var iusuario = verifiDBEmpty(usuarioId)    
    let sn = estado === "cerrado" ? true :  false        
    cajasUsuarios(fdesde,fhasta,iusuario,sn)
        .then((rows) => {                                
          res.status(200).send({result:rows})
        })
        .catch((reason) => {         
        console.log(reason)
        res.status(400).send({ message: reason });
        });
   
}

const i_estados = (req,res) =>{     
    const { clienteId } = req.body;       
    /*console.log(req.body)
    var dDesde = new Date(desde)
    var dHasta = new Date(hasta) 
    var fdesde = (new Date(dDesde + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 
    var fhasta = (new Date(dHasta + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]    */
          
    estadoCliente(clienteId)
        .then((rows) => {            
            res.status(200).send({result:rows})
        })
        .catch((reason) => {                 
        res.status(400).send({ message: reason });
        });
   
}

const i_compras = (req,res) =>{        
    const { desde, hasta, proveedorId, estado  } = req.body;       
    var iproveedor = verifiDBEmpty(proveedorId)
    let fdesde = 0 
    let fhasta = 0

    if((desde !== 0 && desde !== '0') && (hasta !== 0 && hasta !== '0')){
        var dDesde = new Date(desde)  
        var dHasta = new Date(hasta)     
        fdesde = (new Date(dDesde + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 
        fhasta = (new Date(dHasta + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]
    }else{        
        fdesde = 0 
        fhasta = 0
    }        
    comprasInforme(fdesde,fhasta,iproveedor,estado)
        .then((rows) => {                
            
            res.status(200).send({result:rows})
        })
        .catch((reason) => {         
        console.log(reason)
        res.status(400).send({ message: reason });
        });
   
}
const i_maxcompras = (req,res) =>{        
    const { desde, hasta, productoId } = req.body;   
    var iproducto   = verifiDBEmpty(productoId)      
    let fdesde = 0 
    let fhasta = 0

    if((desde !== 0 && desde !== '0') && (hasta !== 0 && hasta !== '0')){
        var dDesde = new Date(desde)  
        var dHasta = new Date(hasta)     
        fdesde = (new Date(dDesde + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 
        fhasta = (new Date(dHasta + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]
    }else{        
        fdesde = 0 
        fhasta = 0
    }        

    maxCompras(fdesde,fhasta,iproducto)
        .then((rows) => {                        
            res.status(200).send({result:rows})
        })
        .catch((reason) => {         
        console.log(reason)
        res.status(400).send({ message: reason });
        });
   
}

const i_ventas = (req,res) =>{        
    const { desde, hasta, clienteId, estado  } = req.body;      
    var icliente   = verifiDBEmpty(clienteId)
    let fdesde = 0 
    let fhasta = 0

    if((desde !== 0 && desde !== '0') && (hasta !== 0 && hasta !== '0')){
        var dDesde = new Date(desde)  
        var dHasta = new Date(hasta)     
        fdesde = (new Date(dDesde + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 
        fhasta = (new Date(dHasta + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]
    }else{        
        fdesde = 0 
        fhasta = 0
    }
    ventasInforme(fdesde,fhasta,icliente,estado)
        .then((rows) => {                        
            res.status(200).send({result:rows})
        })
        .catch((reason) => {                 
        res.status(400).send({ message: reason });
        });
   
}

const i_maxventas = (req,res) =>{        
    const { desde, hasta, productoId } = req.body;        
    var iproducto   = verifiDBEmpty(productoId)        
    let fdesde = 0 
    let fhasta = 0

    if((desde !== 0 && desde !== '0') && (hasta !== 0 && hasta !== '0')){
        var dDesde = new Date(desde)  
        var dHasta = new Date(hasta)     
        fdesde = (new Date(dDesde + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 
        fhasta = (new Date(dHasta + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]
    }else{        
        fdesde = 0 
        fhasta = 0
    }        

    maxVentas(fdesde,fhasta,iproducto)
        .then((rows) => {                        
            res.status(200).send({result:rows})
        })
        .catch((reason) => {         
        console.log(reason)
        res.status(400).send({ message: reason });
        });
   
}

module.exports={
    i_existencias,
    i_productos,
    i_movimientos,
    i_cobros,
    i_pagos,
    i_cajas,
    i_estados,
    i_compras,
    i_maxcompras,
    i_ventas, 
    i_maxventas
}