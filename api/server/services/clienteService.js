import db from '../../src/models';
import jwt from "jsonwebtoken"
import { Op as _Op, fn, col } from 'sequelize';
import { _grafico, _consultas, _fcliente, _fclient } from '../../formats/clientes/_datas'
import { dataSucursals } from './sucursalService'

const { Cliente, Categoria } = db;


const consolidadoClientes = (gestion)=> { 
    return new Promise((resolve, reject) => {
        Cliente.findOne({ 
          raw: true,
          nest: true,
          attributes: [[fn('count', col('id')), 'total']],                   
        })
        .then((row) => {
          Cliente.findAll({ 
            raw: true,
            nest: true,
            attributes: [[fn('count', col('id')), 'total'],'tipo'],         
            group: ['tipo']
          })
          .then((rows) => {            
            let newData = _grafico(rows)
            resolve({cl_total:row,cl_items:newData})
          })
          .catch((reason) => {
              reject({ message: reason.message })
          }); 
        })
        .catch((reason) => {
            reject({ message: reason.message })
        });
     });
  }

  const dataClientes =(pag,num,prop,value) =>{      	
    return new Promise((resolve, reject) => {
      let page = parseInt(pag);
      let der = num * page - num;
      Cliente.findAndCountAll({
        raw: true,
        nest: true,
        offset: der,
        limit: num,
        order: [[prop, 'asc']],    
        /*where:{[prop]:{[_Op.iLike]: value}} ,            */
        where: {
          [_Op.and]: [                                                            
            {[prop]:{[_Op.iLike]: value}},
            { rol:{[_Op.eq]: 'cliente'}}                  
          ]
        }, 
        attributes:['id','nombres','direccion','tipo','nit','telefono','celular','pais','ciudad','email','filename']      
      })
        .then((clientes) =>
          resolve({
            paginas: Math.ceil(clientes.count / num),
            pagina: page,
            total: clientes.count,
            data: clientes.rows,
          })
        )
        .catch((reason) => reject(reason));
    });
  }  

  const mostrarClientes = (pky) =>{
    return new Promise((resolve,reject)=>{
        Cliente.findByPk(pky,{
            raw:true,
            nest:true,
            attributes:["id","nombres","direccion","nit","telefono","rol","personaContacto","pais","ciudad","celular","web","filename","descripcion","enabled","email","snum","valor","portada","facebook","instagram","tiktok","latitude","longitude","tipo","icon","banner","slider","video","hinicio","hfin","likes","views","tags","nivel","username","categoriaId","vencimiento"],
            include:[
              { model:Categoria,as:"categoria",
                attributes:["id","nombre"],              
              }                
          ],
        })
        .then((row)=>{
          dataSucursals(1,12,pky)
          .then((rows)=>{
              resolve({item:row,items:rows})
          })          
        })
        .catch((reason)=> reject({message: reason.message}))
    })
}

const mostrarClientex = (pky) =>{
  return new Promise((resolve,reject)=>{
    Cliente.findByPk(pky,{
      raw:true,
      nest:true,
      attributes:["id","nombres","direccion","nit","telefono","rol","personaContacto","pais","ciudad","celular","web","filename","descripcion","enabled","email","snum","valor","portada","facebook","instagram","tiktok","latitude","longitude","tipo","icon","banner","slider","video","hinicio","hfin","likes","views","tags","nivel","username","categoriaId","vencimiento"],
      include:[
        { model:Categoria,as:"categoria",
          attributes:["id","nombre"],              
        }                
    ],
    })
    .then((row)=>{
      let nitem = _fclient(row)        
      resolve(nitem)                 
    })
    .catch((reason)=> reject({message: reason.message}))
  })
}
const actualizarCliente = (dato,datoId) =>{
  return new Promise((resolve,reject)=>{        
      Cliente.update(dato,{
          where: { id: Number(datoId) }
      })
      .then((xrow)=> {
        Cliente.findByPk(datoId,{
          raw:true,
          nest:true
      })
      .then((row)=> resolve(row))
      .catch((reason)=> reject({message: reason.message}))  
      })
      .catch((reason)=> reject({message: reason.message}))
  })
}

const registrarCliente = (dato) =>{
  return new Promise((resolve,reject)=>{    
      Cliente.create(dato)
      .then((row)=> resolve( row ))
      .catch((reason)=> reject({message: reason}))
  })
}

const itemsClientes =(nombres,prop) =>{      	
  return new Promise((resolve, reject) => {      
    Cliente.findAll({
      raw: true,
      nest: true,        
      order: [['nombres', 'ASC']],    
      where: {
        [_Op.and]: [            
          { [prop]: { [_Op.iLike]: nombres } }
        ]
      },                  
      attributes:[['id','value'],['labels','label'],'nit'],
    })
      .then((clientes) =>
        resolve(clientes)
      )
      .catch((reason) => reject(reason));
  });
} 


const  loginCliente = (dato)=>{             
  return new Promise((resolve,reject)=>{        
    let newDate = new Date()
    let nDate   = (new Date(newDate + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 

    console.log(newDate)
    console.log(nDate)

    const { email, password } = dato
      Cliente.findOne({          
          where: {[_Op.and]: [
              { email:{[_Op.eq]: email}},
              { enabled: { [_Op.eq]: true}},
              { vencimiento: { [_Op.gte]: nDate}}
          ]},
          attributes:['id','nombres','email','password','rol','vencimiento']       
      })
      .then((user)=>{            
          if(!user){                
              resolve({
                  auth: false,
                  message: "Usuario no existe",
                  usuario: null
            })
          }else{                
              user.comparePassword(password,(err, isMatch)=>{
                  if(isMatch && !err){
                      /** */
                      let payload = { user_id: user.id, email:user.email }
                      let token   = jwt.sign(payload,"1click2023",{
                          expiresIn: "2629746000"
                      });
                      let newUser = {
                          id        : user.id,
                          nombres   : user.nombres,
                          email     : user.email,
                          rol       : user.rol,
                          email     : user.email                          
                      }                      
                      resolve({                                                                    
                        auth     : true,
                        usuario  : newUser,
                        message  : "Acceso correcto",                            
                        token    : token                  
                      })                                                                                                     
                  }else{
                      resolve({
                          auth: false,
                          message: "Contraseña incorrecta",
                          usuario: null
                      })
                  }
              })
          }
      })
      .catch((reason)=> reject({message: reason.message}))

})
}


const searchMail =(email) =>{      	
  return new Promise((resolve, reject) => {    
    Cliente.findOne({
      raw: true,
      nest: true,      
      where:{email:{[_Op.eq]: email}}
    })
      .then((row) =>{
        let iko = row ? true : false
        resolve(iko)
      })
      .catch((reason) => reject(reason));
  });
}  


const consultaClientes =(pag,num,prop,value,categoriaId,latMayor,latMenor,lonMayor,lonMenor, latitude, longitude) =>{      	
  return new Promise((resolve, reject) => {
   
    let page = parseInt(pag);
    let der = num * page - num;
    Cliente.findAndCountAll({
      raw: true,
      nest: true,
      offset: der,
      limit: num,
      order: [[prop, 'asc']],    
      /*where:{[prop]:{[_Op.iLike]: value}} ,            */
      where: {
        [_Op.and]: [                                                            
          {[prop]:{[_Op.iLike]: value}},
          { categoriaId : {[categoriaId > 1 ? _Op.eq: _Op.gt]: categoriaId}},          
          { rol:{[_Op.eq]: 'cliente'}},
          { latitude : { [_Op.gt]: latMenor}},          
          { latitude : { [_Op.lt]: latMayor}},
          { longitude : { [_Op.gt]: lonMenor}},          
          { longitude : { [_Op.lt]: lonMayor}}              
        ]
      }, 
      attributes:['id','latitude','longitude','nombres','direccion','tipo','nit','telefono','celular','pais','ciudad','email','filename','hinicio','hfin']      
    })
      .then((clientes) =>{
        let newItems = _consultas(clientes.rows,latitude,longitude)
        let iok={
          paginas : Math.ceil(clientes.count / num),
          pagina  : page,
          total   : clientes.count,
          data    : newItems
        }
        resolve(iok)        
      })
      .catch((reason) => reject(reason));
  });
}  

const mostrarCliente = (pky,latitude, longitude) =>{
  return new Promise((resolve,reject)=>{
      Cliente.findByPk(pky,{
          raw:true,
          nest:true,
          attributes:["id","nombres","direccion","nit","telefono","rol","personaContacto","pais","ciudad","celular","web","filename","descripcion","enabled","email","snum","valor","portada","facebook","instagram","tiktok","latitude","longitude","tipo","icon","banner","slider","video","hinicio","hfin","likes","views","tags","nivel","username","categoriaId","vencimiento","moneda","labelMoneda"],
          include:[
            { model:Categoria,as:"categoria",
              attributes:["id","nombre"],              
            }                
        ],
      })
      .then((row)=>{
        let nitem = _fcliente(row,latitude, longitude)        
        resolve(nitem)                 
      })
      .catch((reason)=> reject({message: reason.message}))
  })
}

module.exports = {    
    consolidadoClientes,
    dataClientes,
    mostrarCliente,
    mostrarClientex,
    mostrarClientes,
    actualizarCliente,
    registrarCliente,
    itemsClientes,
    loginCliente,
    searchMail,
    consultaClientes
}   
