
import { verifiDBNull, verifiDBEmpty } from '../../functions/env';
import { _deleteSucursal, itemsSucursals, dataSucursals, mostrarSucursal, actualizarSucursal, registrarSucursal } from "../services/sucursalService.js";

const  s_data =(req,res)=>{ 
    console.log(req.body)
    const {pagina, num, clienteId, latitude, longitude } = req.body           
    dataSucursals(pagina,num,clienteId,latitude,longitude)
        .then((rows)=>{   
            console.log(rows)                                     
            res.status(200).send({result: rows })                         
        })
        .catch((reason)=>{
            console.log(reason)
            res.status(400).send({message: reason})
        })     
}

const s_registrar = (req,res) =>{          
    console.log(req.body)
    registrarSucursal(req.body)
    .then((rows)=>{
        res.status(200).send({result: rows })                         
    })
    .catch((reason)=>{
        console.log(reason)
        res.status(400).send({message: reason})
    })
}

const s_actualizar = (req,res) =>{     
    const { pagina, num, clienteId } = req.body      
    /*dato,datoId,pag,num,clienteId*/
    console.log('******************************')
    console.log(req.body)
    console.log('******************************')
    actualizarSucursal(req.body,req.params.id,pagina,num,clienteId)
    .then((rows)=>{
        res.status(200).send({result: rows })                         
    })
    .catch((reason)=>{   
        console.log(reason)            
        res.status(400).send({message: reason})
    })        
}

const s_mostrar = (req,res) =>{        
    mostrarSucursal(req.params.id)
    .then((row)=>{
        res.status(200).send({result: row})                
    })    
}

const s_items = (req,res) =>{    
    itemsSucursals()
    .then((rows)=>{        
        res.status(200).send({result:rows})
    })
    .catch((reason)=>{        
        console.log(reason)
        res.status(400).send({message: reason})
    })    
}

const s_borrar = (req,res) =>{                  
    _deleteSucursal(req.body)
    .then((rows)=>{
        res.status(200).send({result:rows})
    })
    .catch((reason)=>{   
        console.log(reason)     
        res.status(400).send({message: reason})
    })    
}

module.exports={
    s_data,
    s_mostrar,
    s_actualizar,
    s_registrar,
    s_items,
    s_borrar
    
}