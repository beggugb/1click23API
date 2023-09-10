import { mostrarEmpresa, actualizarEmpresa } from '../services/empresaService'


const  e_item =(_req,res)=>{
    mostrarEmpresa(1)
        .then((row) => { 
           res.status(200).send({ result: row  });
        })
        .catch((reason) => {
           res.status(400).send({ message: reason });
        });        
    }
const  e_update =(req,res)=> {        
        actualizarEmpresa(req.body,req.params.id)
            .then((row)=>{                                   
                res.status(200).send({result: row})                                
            })
            .catch((reason)=>{                
                res.status(400).send({message: reason})
            })        
    }
module.exports={
    e_item,
    e_update
}