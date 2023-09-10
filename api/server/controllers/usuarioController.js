import { loginUsuario, listarUsuarios, mostrarUsuario, actualizarUsuario, createUsuario, itemsUsuarios } from "../services/usuarioService"
import { consolidadoClientes } from '../services/clienteService'
import { consolidadoVentas } from '../services/ventaService'

import { consolidadoExistencias } from '../services/sucursalItemService'
import { planConsolidado } from '../services/planPagoService'
import { verifiDBNull } from '../../functions/env'
const bcrypt = require("bcrypt");



const  u_login = (req,res)=>{         
    loginUsuario(req.body)
    .then((row)=>{                   
        res.status(200).send({result: row })         
        })       
    .catch((reason)=>{             
        res.status(400).send({message: reason})
    })  
}

const  u_data = (req,res)=>{            
    const { parametro, pagina, num } = req.body        
    let inombres    = verifiDBNull(parametro)                 
    listarUsuarios(pagina,num,inombres)
    .then((rows)=>{                
        res.status(200).send({result: rows})
    })
    .catch((reason)=>{   
        console.log(reason)          
        res.status(400).send({message: reason})
    })  
}
const  u_mostrar = (req,res)=>{         
    mostrarUsuario(req.params.id,req.params.tipo)
    .then((rows)=>{
        console.log(rows)
        res.status(200).send({result: rows})
    })
    .catch((reason)=>{               
        res.status(400).send({message: reason})
    })  
}
const  u_actualizar = (req,res)=>{   
    const { tipo, nombres, apellidos, username, password,  sucursalId, rol, direccion, telefono, celular, enabled } = req.body   
    let newIok={}
    if(tipo === 'single'){      
        newIok = {            
            nombres   : nombres,
            apellidos : apellidos,
            username  : username,                     
            sucursalId: sucursalId,
            rol       : rol,
            direccion : direccion,
            telefono  : telefono,
            celular   : celular,
            sucursalId : sucursalId,
            enabled: enabled 
        }    
    }else{     
        newIok = {                        
            password  : bcrypt.hashSync(password, bcrypt.genSaltSync(10), null),                        
        }
    }
    actualizarUsuario(newIok,req.params.id)
        .then((rows)=>{
            res.status(200).send({result: rows})
        })
        .catch((reason)=>{                 
            res.status(400).send({message: reason})
        })
} 

const  u_registrar = (req,res)=>{         
        createUsuario(req.body)
        .then((row)=>{                
        res.status(200).send({result: row })         
        })
        .catch((reason)=>{             
            res.status(400).send({message: reason})
        }) 
} 
const  u_borrar = (req,res)=>{} 

const  u_items = (req,res)=>{         
    const { parametro } = req.body
    let inombres  = verifiDBNull(parametro)      
    itemsUsuarios(inombres)
      .then((rows)=>{
            res.status(200).send({result: rows})
        })
      .catch((reason)=>{               
            res.status(400).send({message: reason})
        }) 
}

const  u_consolidado = (req,res)=>{         
   /* const { tipo, gestion  } = req.body
    if(tipo === "administrador"){
        Promise.all([                        
            consolidadoVentas(),
            consolidadoCompras(),            
            planConsolidado(true,'pagado'),
            planConsolidado(true,'pendiente'),            
            planConsolidado(false,'pagado'),
            planConsolidado(false,'pendiente')
            
        ])        
        .then(([ventas,compras,cobros_pa,cobros_pe,pagos_pa,pagos_pe])=>{   
            res.status(200).send({result: {ventas:ventas,compras:compras,pa_cobros:cobros_pa,pe_cobros:cobros_pe,pa_pagos:pagos_pa,pe_pagos:pagos_pe}})
        })        
        .catch((reason)=>{      
            console.log(reason)           
            res.status(400).send({message: reason})
        })         
    }
    if(tipo === "usuario"){
        Promise.all([            
            consolidadoClientes(gestion),
            consolidadoPlanes(gestion),            
        ])        
        .then(([clientes,vpendientes])=>{  
                     
            res.status(200).send({result: {clientes:clientes,estados:vpendientes}})
        })        
        .catch((reason)=>{                      
            res.status(400).send({message: reason})
        }) 
    }
    if(tipo === "cajero"){
        console.log('cajero')
    }*/
}

module.exports={    
    u_login,    
    u_data,
    u_mostrar,
    u_actualizar,
    u_registrar,
    u_borrar,
    u_items,
    u_consolidado
}