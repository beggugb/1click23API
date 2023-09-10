import { verifiDBNull, verifiDBNulls } from '../../functions/env'
import { registrarProducto, actualizarProducto, dataProductos, showProducto, mostrarProducto } from "../services/productoService"
import { itemsCategorias as _citems } from "../services/categoriaService"

const  c_data = (req,res)=>{        
    const { prop, parametro, pagina, num, clienteId } = req.body        
    console.log(req.body)
    let ivalue = verifiDBNull(parametro) 
    dataProductos(pagina,num,prop,ivalue,clienteId)
    .then((rows)=>{      
     
        res.status(200).send({result: rows })
    })  
    .catch((reason)=>{            
        console.log(reason)    
        res.status(400).send({message: reason.message.message})
    })  
}



const  c_items = (req,res)=>{         
    _citems()
    .then((pcategoria)=>{
        res.status(200).send({result: {pcategoria}})
    })
    .catch((reason)=>{    
        console.log(reason)      
        res.status(400).send({message: reason})
    })  
}  

const  c_mostrar = (req,res)=>{    
    if(req.params.tipo === 'list'){
        showProducto(req.params.id)
        .then((row)=>{ res.status(200).send({result: row}) })  
        .catch((reason)=>{ 
            console.log(reason)
            res.status(400).send({message: reason})
        })  
    }else{
        mostrarProducto(req.params.id)
        .then((row)=>{ res.status(200).send({result: row}) })
            .catch((reason)=>{ res.status(400).send({message: reason}) })            
    }        
}


const  c_actualizar = (req,res)=>{    
    actualizarProducto(req.body,req.params.id)
    .then((row)=>{        
        res.status(200).send({result: row })        
    })  
    .catch((reason)=>{     
        console.log(reason)           
        res.status(400).send({message: reason.message.message})
    })  
}

const  c_registrar = (req,res)=>{    
    registrarProducto(req.body)
    .then((row)=>{
        res.status(200).send({result: row})
    })  
    .catch((reason)=>{      
        console.log(reason)    
        res.status(400).send({message: reason.message})
    })  
}


module.exports={    
    c_data,
    c_items,
    c_mostrar,
    c_actualizar,
    c_registrar      
}