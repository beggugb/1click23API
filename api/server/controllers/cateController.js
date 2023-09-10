import { verifiDBNull } from '../../functions/env';
import { _deleteCate, itemsCates, dataCates, mostrarCate, actualizarCate, registrarCate } from "../services/cateService.js";

const  c_data =(req,res)=>{ 
    const { parametro,pagina, num, order, prop, clienteId } = req.body    
    console.log(req.body)     
 
    let iparametro = verifiDBNull(parametro)    
    let iorden = order ? 'asc': 'desc'                       

    dataCates(pagina,num,iparametro,prop,iorden,clienteId)
        .then((rows)=>{                                              
            res.status(200).send({result: rows })                         
        })
        .catch((reason)=>{
            res.status(400).send({message: reason})
        })     
}

const c_mostrar = (req,res) =>{        
    mostrarCate(req.params.id)
    .then((row)=>{
        res.status(200).send({result: row})                
    })    
}

const c_actualizar = (req,res) =>{     
    const { parametro,pagina, num, order, prop, clienteId } = req.body         
    let iparametro = verifiDBNull(parametro)    
    let iorden = order ? 'asc': 'desc'   
    actualizarCate(req.body,req.params.id,pagina,num,iparametro,prop,iorden,clienteId)
    .then((rows)=>{
        res.status(200).send({result: rows })                         
    })
    .catch((reason)=>{   
        console.log(reason)            
        res.status(400).send({message: reason})
    })        
}

const c_registrar = (req,res) =>{      
    const { pagina, clienteId } = req.body      
    registrarCate(req.body,pagina,12,clienteId)
    .then((rows)=>{
        res.status(200).send({result: rows })                         
    })
    .catch((reason)=>{
        console.log(reason)
        res.status(400).send({message: reason})
    })
}

const c_items = (req,res) =>{        

    itemsCates(req.params.id)
    .then((rows)=>{   
  
        res.status(200).send({result:rows})
    })
    .catch((reason)=>{  
        console.log(reason)      
        res.status(400).send({message: reason})
    })    
}

const c_borrar = (req,res) =>{    
    const { pagina, num, order, prop, cateId, clienteId } = req.body             
    let iorden = order ? 'asc': 'desc'       
    _deleteCate(cateId,pagina,num,prop,iorden,clienteId)
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