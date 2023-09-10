const {verifiDBNull} = require('../../functions/env')
import { aprobarComprobante, borrarComprobante, registrarComprobante, dataComprobantes, actualizarComprobante, mostrarComprobante } from "../services/comprobanteService"
import { dataAsientos, saldo, diarios, mayores, _saldos } from "../services/asientoService"
import { _fcomprobantes } from "../../formats/comprobantes/_datas"

const  c_saldo = (req,res)=>{        
    saldo()
    .then((rows)=>{       
       res.status(200).send({result: rows})
    })
    .catch((reason)=>{
        console.log(reason)
        res.status(400).send({message: reason})
    }) 
}

const  c_data = (req,res)=>{     
    const { pagina, gestion, num,prop, parametro, desde, hasta } = req.body
    let igestion =   gestion.toString()   
    let ivalue = verifiDBNull(parametro)          
    let fdesde = 0 
    let fhasta = 0
    if(desde !== 0 && hasta !== 0){
        var dDesde = new Date(desde)  
        var dHasta = new Date(hasta)     
        fdesde = (new Date(dDesde + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 
        fhasta = (new Date(dHasta + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]
    }else{        
        fdesde = 0 
        fhasta = 0
    }                       

    dataComprobantes(pagina, num, igestion, prop, ivalue,fdesde,fhasta)
        .then((rows)=>{                                 
            res.status(200).send({result: rows})                
        })
        .catch((reason)=>{
            console.log(reason)
            res.status(400).send({message: reason})
        })     
}

const c_mostrar = (req,res) =>{
    mostrarComprobante(req.params.id)
    .then((rows)=>{     
        res.status(200).send({result: rows})                
    })
    .catch((reason)=>{
        console.log(reason)
        res.status(400).send({message: reason})
    }) 
}

const c_update = (req,res) =>{
    const { item, items } = req.body            
    dataAsientos()     
    .then((rows)=>{                
        let newData = _fcomprobantes(items,rows)  
        actualizarComprobante(item,req.params.id,newData)
            .then((rows)=>{                      
                res.status(200).send({result: rows})                
            })
            .catch((reason)=>{
                console.log(reason)
                res.status(400).send({message: reason})
            })        
    })
    .catch((reason)=>{
        console.log(reason)
        res.status(400).send({message: reason})
    }) 
    
}

const  c_registrar = (req,res)=>{     
    const { usuarioId, tipo, ciudad } = req.body    
    registrarComprobante(usuarioId,tipo, ciudad)
        .then((rows)=>{                
            res.status(200).send({result: rows})                
        })
        .catch((reason)=>{
            console.log(reason)
            res.status(400).send({message: reason})
        })     
}

const  c_borrar = (req,res)=>{             
    const { pagina, num, glosa, comprobanteId } = req.body
    borrarComprobante(comprobanteId)
        .then((rows)=>{                
            res.status(200).send({result: rows})                
        })
        .catch((reason)=>{
            console.log(reason)
            res.status(400).send({message: reason})
        })     
}

const  c_aprobar = (req,res)=>{             
        aprobarComprobante(req.body,req.params.id)
        .then((rows)=>{                
            res.status(200).send({result: rows})                
        })
        .catch((reason)=>{
            console.log(reason)
            res.status(400).send({message: reason})
        }) 
}


const  c_diarios = (req,res)=>{        
    const { desde, hasta  } = req.body;             
    var dDesde = new Date(desde)
    var dHasta = new Date(hasta) 
    var fdesde = (new Date(dDesde + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 
    var fhasta = (new Date(dHasta + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]      
    diarios(fdesde,fhasta)
    .then((rows)=>{                
            res.status(200).send({result: rows})
    })
    .catch((reason)=>{
        console.log(reason)
        res.status(400).send({message: reason})
    }) 
}

const  c_mayores = (req,res)=>{        
    const { pucId  } = req.body;
    mayores(pucId)
    .then((rows)=>{                
            res.status(200).send({result: rows})
    })
    .catch((reason)=>{
        console.log(reason)
        res.status(400).send({message: reason})
    }) 
}

const  c_saldos = (req,res)=>{        
    const { desde, hasta } = req.body;             
    var dDesde = new Date(desde)
    var dHasta = new Date(hasta)
    var fdesde = (new Date(dDesde + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 
    var fhasta = (new Date(dHasta + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]      
    _saldos(fdesde,fhasta)
    .then((rows)=>{                
            res.status(200).send({result: rows})
    })
    .catch((reason)=>{
        console.log(reason)
        res.status(400).send({message: reason})
    }) 
}

module.exports={    
    c_saldo,
    c_data,
    c_mostrar,
    c_update,
    c_registrar,
    c_borrar,
    c_aprobar,
    c_diarios,
    c_mayores,
    c_saldos 
}







