import { verifiDBNull } from '../../functions/env';
import { _deleteTrabajo, itemsTrabajos, dataTrabajos, mostrarTrabajo, actualizarTrabajo, registrarTrabajo } from "../services/trabajoService.js";

const  c_data =(req,res)=>{ 
    const { parametro,pagina, num, clienteId } = req.body        
 
    let iparametro = verifiDBNull(parametro)                       

    dataTrabajos(pagina,num,iparametro,clienteId)
        .then((rows)=>{                                              
            res.status(200).send({result: rows })                         
        })
        .catch((reason)=>{
            res.status(400).send({message: reason})
        })     
}

const c_mostrar = (req,res) =>{        
    mostrarTrabajo(req.params.id)
    .then((row)=>{
        res.status(200).send({result: row})                
    })    
}

const c_actualizar = (req,res) =>{     
    const { parametro,pagina, num, clienteId } = req.body         
    let iparametro = verifiDBNull(parametro)        
    actualizarTrabajo(req.body,req.params.id,pagina,num,iparametro,clienteId)
    .then((rows)=>{
        console.log(rows)
        res.status(200).send({result: rows })                         
    })
    .catch((reason)=>{   
        console.log(reason)            
        res.status(400).send({message: reason})
    })        
}

const c_registrar = (req,res) =>{      
    const { pagina, clienteId } = req.body      
    registrarTrabajo(req.body,pagina,12,clienteId)
    .then((rows)=>{
        res.status(200).send({result: rows })                         
    })
    .catch((reason)=>{
        console.log(reason)
        res.status(400).send({message: reason})
    })
}

const c_items = (req,res) =>{        

    itemsTrabajos(req.params.id)
    .then((rows)=>{   
  
        res.status(200).send({result:rows})
    })
    .catch((reason)=>{  
        console.log(reason)      
        res.status(400).send({message: reason})
    })    
}

const c_borrar = (req,res) =>{    
    const { pagina, num, trabajoId, clienteId } = req.body             
    let iorden = order ? 'asc': 'desc'       
    _deleteTrabajo(trabajoId,pagina,num,clienteId)
    .then((rows)=>{
        res.status(200).send({result:rows})
    })
    .catch((reason)=>{        
        res.status(400).send({message: reason})
    })    
}















module.exports={
    c_data,
    c_mostrar,
    c_actualizar,
    c_registrar,
    c_items,
    c_borrar
    
}