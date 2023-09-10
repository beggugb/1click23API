import { verifiDBNull } from '../../functions/env'
import { aprobarVenta, actualizarVenta, registraVenta, dataVentas, mostrarVenta,  _deleteVenta } from "../services/ventaService"


const fechaHoy = new Date();
const gestion = fechaHoy.getFullYear()
const mes = fechaHoy.getMonth() + 1

const fV  = (new Date(fechaHoy))
const fechaVenta   = (new Date(fV + 'UTC')).toISOString()   
const fechaGestion = gestion+"-01-01"
const finGestion   = gestion+"-12-31"

const  v_listar = (req,res)=>{             
    const { prop, parametro, pagina, num, desde , hasta } = req.body    
    console.log(req.body)
    let ivalue = verifiDBNull(parametro)    
    let iprop  = prop === "cliente" ? "clients" : "observaciones"

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
    dataVentas(pagina,num,iprop, ivalue,fdesde,fhasta)    
    .then((row)=>{          
     
        res.status(200).send({result: row})
    })  
    .catch((reason)=>{             
        res.status(400).send({message: reason.message.message})
    })  
}

const  v_mostrar = (req,res)=>{    
    mostrarVenta(req.params.id,req.params.tipo)
    .then((row)=>{        
        res.status(200).send({result:row})
    })  
    .catch((reason)=>{  
        console.log(reason)              
        res.status(400).send({message: reason})
    })  
}

const  v_registrar = (req,res)=>{        
    registraVenta(req.body)
    .then((row)=>{
      
        res.status(200).send({result: row})
    })  
    .catch((reason)=>{                        
        res.status(400).send({message: reason.message.message})
    })  
}

const  v_delete = (req,res)=>{ 
    const { pagina, num, ventaId } = req.body
    _deleteVenta(pagina, num, ventaId)
    .then((rows)=>{        
            res.status(200).send({result: rows })
        })        
        .catch((reason)=>{      
            console.log(reason)          
            res.status(400).send({message: reason.message})
        })
}

const  v_actualizar = (req,res)=>{ 
    const { item, items } = req.body    
    actualizarVenta(item, items,req.params.id)
    .then((row)=>{        
        res.status(200).send({result: row })        
    })  
    .catch((reason)=>{      
        console.log(reason)          
        res.status(400).send({message: reason.message.message})
    })  
}

const  v_aprobar = (req,res)=>{ 
    /*const { item, plan, nroPagos, contableId, glosa, bancoId, nBanco, cheque, automatico } = req.body 
    if(contableId > 0){
        aprobarVenta(req.params.id,plan,nroPagos,automatico)    
        .then((xxrows)=>{   
                Promise.all([
                    mostrarContable(contableId),
                    dataAsientos()
                ])        
                .then(([rows,xrows])=>{                                                        
                    let newData = ajusteNotaPlan(item,rows.items,xrows,glosa,bancoId,nBanco,cheque)                                
                    registrarAutomatico(newData.nota,newData.asientos,"diario")
                    .then((xx)=>{
                        res.status(200).send({result: xxrows})    
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
        })       
        .catch((reason)=>{             
            console.log(reason)          
            res.status(400).send({message: reason})
        })
    }else{
        aprobarVenta(req.params.id,plan,nroPagos,false)    
        .then((rows)=>{                            
            res.status(200).send({result: rows})
        })
        .catch((reason)=>{             
            console.log(reason)          
            res.status(400).send({message: reason})
        })
    }*/
}

module.exports={    
    v_listar,
    v_mostrar,
    v_registrar,
    v_delete,
    v_actualizar,
    v_aprobar
}


