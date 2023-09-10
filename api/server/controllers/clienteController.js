import { verifiDBNull, verifiDBNulls, verifiDBEmpty, getFechaNueva } from '../../functions/env'
import { searchMail, actualizarPassword, loginCliente, itemsClientes, dataClientes, mostrarCliente, mostrarClientex, actualizarCliente, registrarCliente } from "../services/clienteService"
import { estCliente } from "../services/ventaService"
const bcrypt = require("bcrypt");

const  c_registrar = (req,res)=>{      
    const { tip, nombres,nit,rol,pais,ciudad,email,tags,latitude,longitude,password,categoriaId } = req.body
    console.log(tip)
    let ffg = getFechaNueva()    
    if(tip === "public"){
        let nn ={
        nombres: nombres,
        nit: nit,  
        rol: rol,  
        pais: pais,
        ciudad: ciudad,  
        enabled: true,
        email: email,
        snum: 0,
        valor: 0,  
        latitude: latitude,
        longitude: longitude,  
        likes: 0,
        views: 0,
        tags: tags,  
        password  : bcrypt.hashSync(password, bcrypt.genSaltSync(10), null), 
        categoriaId: categoriaId,
        vencimiento: ffg
        }        
        registrarCliente(nn)
        .then((row)=>{ 
            res.status(200).send({result: row})
        })  
        .catch((reason)=>{  
            console.log(reason)         
            res.status(400).send({message: reason.message.message})
        })        
    }else{
        let nd ={
            nombres: nombres,
            nit: nit,  
            rol: rol,  
            pais: pais,
            ciudad: ciudad,  
            enabled: true,
            email: email,
            snum: 0,
            valor: 0,  
            latitude: latitude,
            longitude: longitude,  
            likes: 0,
            views: 0,
            tags: tags,              
            categoriaId: categoriaId,
            vencimiento: ffg
            }  
        registrarCliente(nd)
        .then((row)=>{ 
            res.status(200).send({result: row})
        })  
        .catch((reason)=>{  
            console.log(reason)         
            res.status(400).send({message: reason.message.message})
        })
    }    
      
}


const  u_login = (req,res)=>{         
    loginCliente(req.body)
    .then((row)=>{                   
        res.status(200).send({result: row })         
        })       
    .catch((reason)=>{             
        res.status(400).send({message: reason})
    })  
}
const  c_data = (req,res)=>{    
    const { pagina, num, prop, parametro } = req.body    

    let ivalue = verifiDBNull(parametro)    
    /*let iprop  = prop === 'nombres' ? 'labels': prop*/
    dataClientes(pagina,num, prop, ivalue)
    .then((row)=>{  
  
        res.status(200).send({result: row})
    })  
    .catch((reason)=>{      
        console.log(reason)       
        res.status(400).send({message: reason.message.message})
    })  
}

const  c_mostrar = (req,res)=>{        
    mostrarClientex(req.params.id)            
    .then((xrow)=>{   
        console.log(xrow)            
        res.status(200).send({result:xrow})           
    })  
    .catch((reason)=>{  
        console.log(reason)                      
        res.status(400).send({message: reason})
    })  
}




const  c_items = (req,res)=>{    
    const { nombres } = req.body
    console.log(nombres)
    let inombres = verifiDBNulls(nombres)    
    let iprop    = 'labels'    
    if (/^(\d)/.test(nombres)) {
        iprop = 'nit'
    }        
    itemsClientes(inombres,iprop)
      .then((rows)=>{    
        res.status(200).send({result: rows})
      })
      .catch((reason)=>{          
        console.log(reason)
        res.status(400).send({message: reason})
      })  
}




const  c_actualizar = (req,res)=>{    
    const { password, username } = req.body            
    let nio = req.params.tipo
    console.log(nio)
    if(nio === "unit"){
        actualizarCliente(req.body,req.params.id)
        .then((row)=>{              
                res.status(200).send({result: row })               
        })  
        .catch((reason)=>{   
            console.log(reason)      
            res.status(400).send({message: reason.message.message})
        })
    }else{        
        let newIok = {                        
            password  : bcrypt.hashSync(password, bcrypt.genSaltSync(10), null),                        
            username: username
        }
        actualizarCliente(newIok,req.params.id)
        .then((row)=>{              
                res.status(200).send({result: row })               
        })  
        .catch((reason)=>{         
            console.log(reason)      
            res.status(400).send({message: reason.message.message})
        })
    }       
          
}

const  c_verify = (req,res)=>{       
    const { email } = req.body    
    searchMail(email)            
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
    c_mostrar,
    c_actualizar,
    c_registrar,
    c_items,
    c_verify,
    u_login
}