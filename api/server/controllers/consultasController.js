import { verifiDBNull, sumarKilometros } from '../../functions/env';
import { consultaClientes,mostrarCliente  } from "../services/clienteService.js";

const  c_data =(req,res)=>{ 
    
    const { latitude, longitude, parametro, pagina, num, prop, categoriaId } = req.body    
    let {latMayor, latMenor,lonMayor,lonMenor} = sumarKilometros(latitude,longitude,10,10)

    let ivalue = verifiDBNull(parametro)  
    consultaClientes(pagina,num,prop,ivalue,categoriaId,latMayor,latMenor,lonMayor,lonMenor,latitude,longitude)
        .then((rows)=>{         
            console.log(rows)
            res.status(200).send({result: rows })                         
        })
        .catch((reason)=>{
            console.log(reason)
            res.status(400).send({message: reason})
        })     
}

const  c_mostrar = (req,res)=>{     
    const { clienteId, latitude, longitude } = req.body       
    mostrarCliente(clienteId, latitude, longitude)            
    .then((xrow)=>{       
        console.log(xrow)                                                     
        res.status(200).send({result:xrow})           
    })  
    .catch((reason)=>{  
        console.log(reason)                      
        res.status(400).send({message: reason})
    })  
}

module.exports={
    c_data,
    c_mostrar
}