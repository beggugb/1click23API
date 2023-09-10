import { verifiDBNull } from '../../functions/env';
import { _deleteCategoria, itemsCategorias, dataCategorias, mostrarCategoria, actualizarCategoria, registrarCategoria } from "../services/categoriaService.js";

const  c_data =(req,res)=>{ 
    const { parametro,pagina, num, order, prop } = req.body         
    let iparametro = verifiDBNull(parametro)    
    let iorden = order ? 'asc': 'desc'                       

    dataCategorias(pagina,num,iparametro,prop,iorden)
        .then((rows)=>{          
            console.log(rows)                                    
            res.status(200).send({result: rows })                         
        })
        .catch((reason)=>{
            console.log(reason)
            res.status(400).send({message: reason})
        })     
}

const c_mostrar = (req,res) =>{        
    mostrarCategoria(req.params.id)
    .then((row)=>{
        res.status(200).send({result: row})                
    })    
}

const c_actualizar = (req,res) =>{         
    const { parametro,pagina, num, order, prop } = req.body     
    console.log(req.body)    
    let iparametro = verifiDBNull(parametro)    
    let iorden = order ? 'asc': 'desc'   
    actualizarCategoria(req.body,req.params.id,pagina,num,iparametro,prop,iorden)
    .then((rows)=>{
        res.status(200).send({result: rows })                         
    })
    .catch((reason)=>{   
        console.log(reason)            
        res.status(400).send({message: reason})
    })        
}

const c_registrar = (req,res) =>{      
    const { pagina } = req.body      
    registrarCategoria(req.body,pagina,12)
    .then((rows)=>{
        res.status(200).send({result: rows })                         
    })
    .catch((reason)=>{
        console.log(reason)
        res.status(400).send({message: reason})
    })
}

const c_items = (req,res) =>{    
    itemsCategorias()
    .then((rows)=>{        
        res.status(200).send({result:rows})
    })
    .catch((reason)=>{  
        console.log(reason)      
        res.status(400).send({message: reason})
    })    
}

const c_borrar = (req,res) =>{    
    const { pagina, num, order, prop, categoriaId } = req.body             
    let iorden = order ? 'asc': 'desc'       
    _deleteCategoria(categoriaId,pagina,num,prop,iorden)
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