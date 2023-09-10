import { verifiDBNull, verifiDBEmpty } from '../../functions/env'
import { itemsCategorias } from "../services/categoriaService"
import { listarStock } from "../services/sucursalItemService"
import { registrarVentaTpdv } from "../services/ventaService"


let hoy   = new Date()
let fhoy  = (new Date(hoy + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]


const  c_data = (req,res)=>{    
    const { value, codigo,categoriaId, usuarioId  } = req.body
    let ivalue  = verifiDBNull(value)   
    let icodigo = verifiDBNull(codigo)            
    let icategoria = verifiDBEmpty(categoriaId)  

    Promise.all([
        itemsCategorias(),
        listarStock(ivalue,icodigo,icategoria),
        itemUser(usuarioId,fhoy)    
    ])    
    .then(([categorias,productos,caja])=>{
        res.status(200).send({result:{categorias:categorias,productos:productos,caja:caja}})
    })
    .catch((reason)=>{        
        res.status(400).send({message: reason})
    }) 
}

const  c_registrar = (req,res)=>{        
    registrarVentaTpdv(req.body)
    .then((row)=>{                
        res.status(200).send({result: row})        
    })  
    .catch((reason)=>{   
        console.log(reason)             
        res.status(400).send({message: reason.message.message})
    })  
}




module.exports={    
    c_data,
    c_registrar,
    registrarVentaTpdv
}
