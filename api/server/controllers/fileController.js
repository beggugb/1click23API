import { _empresa, _cliente, _proveedor, _portada, _producto } from '../services/fileService'
import { actualizarEmpresa } from '../services/empresaService'
import { actualizarCliente } from '../services/clienteService'
import { actualizarProducto } from '../services/productoService' 

const  e_file=(req,res)=>{
    _empresa(req)        
    .then((file)=>{
        const art = {
            filename: file.filename
        }
        actualizarEmpresa(art,req.params.id)
        .then((result)=>{
            res.status(200).send({result})
        })
        .catch((reason)=> {
            res.status(400).send({message: reason})
        })                
    })
    .catch(reason =>{
        console.log(reason)
        res.status(400).send({message: reason})
    })   
}
const  c_file=(req,res)=>{
    _cliente(req)        
        .then((file)=>{
            const art = {
                filename: file.filename
            }
            actualizarCliente(art,req.params.id)
            .then((result)=>{
                res.status(200).send({result})
            })
            .catch((reason)=> {
                console.log(reason)
            })                
        })
        .catch(reason =>{
            console.log(reason)
            res.status(400).send({message: reason})
        })
}

const  p_file=(req,res)=>{
    _portada(req)        
        .then((file)=>{
            const art = {
                portada: file.filename
            }
            actualizarCliente(art,req.params.id)
            .then((result)=>{
                res.status(200).send({result})
            })
            .catch((reason)=> {
                console.log(reason)
            })                
        })
        .catch(reason =>{
            console.log(reason)
            res.status(400).send({message: reason})
        })
}

const  a_file=(req,res)=>{
    _producto(req)        
        .then((file)=>{
            const art = {
                filename: file.filename
            }
            actualizarProducto(art,req.params.id)
            .then((result)=>{
                res.status(200).send({result})
            })
            .catch((reason)=> {
                console.log(reason)
            })                
        })
        .catch(reason =>{
            console.log(reason)
            res.status(400).send({message: reason})
        })
}


module.exports={
    e_file,
    c_file,
    p_file,
    a_file
}