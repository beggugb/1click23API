import { verifiDBNulls, verifiDBNull, verifiDBEmpty, verifiDBNulld } from '../../functions/env'
import { listarDispolible, listarProductos } from "../services/productoService"

const  s_stock = (req,res)=>{    
    const { pagina,num, value, categoriaId, clienteId  } = req.body
    let ivalue  = verifiDBNull(value)      
    let icategoria = verifiDBEmpty(categoriaId)                     
    
    listarDispolible(pagina,num,ivalue,icategoria,clienteId)
    .then((rows)=>{    
        console.log(rows)        
        res.status(200).send({result: rows})
    })  
    .catch((reason)=>{                     
        res.status(400).send({message: reason})
    })  
}




module.exports={    
    s_stock    
}
