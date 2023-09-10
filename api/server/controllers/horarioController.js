
import { verifiDBNull, verifiDBEmpty } from '../../functions/env';
import { actualizarHorario, dataHorarios } from "../services/horarioService.js";



const  s_data =(req,res)=>{ 
    const { sucursalId } = req.body           
    dataHorarios(sucursalId)
        .then((rows)=>{         
                                             
            res.status(200).send({result: rows })                         
        })
        .catch((reason)=>{
            res.status(400).send({message: reason})
        })     
}

const s_actualizar = (req,res) =>{     
    const { sucursalId } = req.body     
    console.log(req.body) 

    actualizarHorario(req.body,req.params.id,sucursalId)
    .then((rows)=>{
        res.status(200).send({result: rows })                         
    })
    .catch((reason)=>{   
        console.log(reason)            
        res.status(400).send({message: reason})
    })        
}
/*
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
*/
module.exports={  
    s_actualizar,
    s_data,
    /*s_mostrar,
    s_actualizar,    
    s_borrar*/
    
}