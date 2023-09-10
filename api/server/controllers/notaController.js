
import { actualizarNotaItem } from '../services/notaService'



const  c_actualizar = (req,res)=>{        
    const { item, tipo, glosa, contableId,bancoId, nBanco, cheque } = req.body             
    if(contableId > 0){
        Promise.all([
            actualizarNotaItem(item,req.params.id),
            mostrarContable(contableId),
            dataAsientos()
        ])        
        .then(([xrow,rows,xrows])=>{ 
            let newData = ajustePagoCaja(item,rows.items,xrows,glosa,bancoId, nBanco, cheque)            
            registrarAutomatico(newData.nota,newData.asientos,"diario")
                .then((xx)=>{
                    res.status(200).send({result: xrow })   
                })
                .catch((reason)=>{   
                    console.log(reason)          
                    res.status(400).send({message: reason})
                })
        })
        .catch((reason)=>{   
            console.log(reason)          
            res.status(400).send({message: reason})
        })

    }else{
     actualizarNotaItem(req.body,req.params.id)
        .then((row)=>{        
            res.status(200).send({result: row })        
        })  
        .catch((reason)=>{      
            console.log(reason)          
            res.status(400).send({message: reason.message.message})
        })    
    }
}  

module.exports={    
    c_actualizar
}
