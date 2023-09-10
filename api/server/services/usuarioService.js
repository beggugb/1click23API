import db from "../../src/models"
import jwt from "jsonwebtoken"
import { singleEmpresa } from './empresaService'
import { Op as _Op } from 'sequelize';

import { _fusuarios } from '../../formats/usuarios/_datas'

const { Usuario, Sucursal } = db;
let hoy   = new Date()
let fhoy  = (new Date(hoy + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]


const  loginUsuario = (dato)=>{             
    return new Promise((resolve,reject)=>{        
        const { username, password } = dato
        
        Usuario.findOne({
            /*where: { username : { [_Op.eq]: username}},*/
            where: {[_Op.and]: [
                { username:{[_Op.eq]: username}},
                { enabled: { [_Op.eq]: true}}
            ]},
            attributes:['id','nombres','username','password','rol','sucursalId'],
            include:[                
                {model:Sucursal,as:"sucursal",attributes:['id','nombre','ciudad']},
            ] 
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
                        let payload = { user_id: user.id, username:user.username }
                        let token   = jwt.sign(payload,"unity2022",{
                            expiresIn: "2629746000"
                        });
                        let newUser = {
                            id         : user.id,
                            nombres    : user.nombres,
                            username   : user.username,
                            rol        : user.rol,
                            sucursalId : user.sucursalId,
                            snombre    : user.sucursal.nombre,
                            sciudad    : user.sucursal.ciudad

                        }
                        let iok={
                            proceso   : "login de ingreso",
                            usuarioId : user.id,
                            fecha     : fhoy
                        }
                        registrarProceso(iok)
                        .then((rpro)=>{
                            Promise.all([
                        
                                singleEmpresa(1)
                            ])
                            .then(([tareas,procesos,emp])=>{                                
                                resolve({                                                                    
                                    auth     : true,
                                    usuario  : newUser,
                                    message  : "Acceso correcto",                            
                                    token    : token,
                                    tareas   : tareas,
                                    procesos : procesos,
                                    empresa  : emp                                   
                          })
                            })            
                        })
                        .catch((reason)=>{                                 
                            res.status(400).send({message: reason})
                        })                            
                    /** */    
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


const listarUsuarios = (pag,num,nombre) =>{
    return new Promise((resolve, reject)=>{        
        let page = parseInt(pag)
        let der = num * page - num        
        Usuario.findAndCountAll({
            raw:true,
            nest:true,
            offset: der,
            limit: num,
            order: [['nombres','asc']],
            where: { nombres: { [_Op.iLike]: nombre } },                                       
            include:[
                {model:Sucursal,as:"sucursal",attributes:["id","nombre","ciudad"]}
            ]
        })        
        .then((rows)=> {
            let newData = {
                data    : _fusuarios(rows.rows),
                paginas : Math.ceil(rows.count / num),
                pagina  : page,
                total   : rows.count,
            } 
            resolve(newData)
        })        
        .catch((reason)=> reject({message: reason.message}))
    })
}

const  mostrarUsuario = (pky)=>{                 
    return new Promise((resolve,reject)=>{
        Usuario.findByPk(pky,{
            raw:true,
            nest:true,
            attributes:["id","nombres","apellidos","direccion","telefono","celular","filename","rol","username","sucursalId","enabled"],   
            include:[
                {model:Sucursal,as:"sucursal",attributes:["id","nombre","ciudad"]}
            ]         
        })
        .then((row)=> resolve( row ))
        .catch((reason)=> reject({message: reason.message}))
    })    
}

const  actualizarUsuario = (dato,datoId)=>{                     
    return new Promise((resolve,reject)=>{        
            Usuario.update(dato,{
                where: { id: Number(datoId) }
            })
            .then((row)=> {
                Usuario.findByPk(datoId,{
                    raw:true,
                    nest:true,
                    attributes:["id","nombres","apellidos","direccion","telefono","celular","filename","rol","username","sucursalId","enabled"],   
                    include:[
                        {model:Sucursal,as:"sucursal",attributes:["id","nombre","ciudad"]}
                    ]
                })
                .then((xrow)=> resolve( xrow ))
                .catch((reason)=> reject({message: reason.message}))
            })
            .catch((reason)=> reject({message: reason.message}))
        })      
}

const  createUsuario = (dato)=>{                     
    return new Promise((resolve,reject)=>{        
            Usuario.create(dato)
            .then((row)=> {
                Usuario.findByPk(row.id,{
                    raw:true,
                    nest:true,
                    attributes:["id","nombres","apellidos","direccion","telefono","celular","filename","rol","username","sucursalId","enabled"],   
                    include:[
                        {model:Sucursal,as:"sucursal",attributes:["id","nombre","ciudad"]}
                    ]
                })
                .then((xrow)=> resolve( xrow ))
                .catch((reason)=> reject({message: reason.message}))
            })
            .catch((reason)=> reject({message: reason.message}))
        })      
}

const itemsUsuarios =(nombres) =>{      	
    return new Promise((resolve, reject) => {      
      Usuario.findAll({
        raw: true,
        nest: true,        
        order: [['nombres', 'ASC']],    
        where: {
          [_Op.and]: [            
            { nombres: {[_Op.iLike]: nombres } }
          ]
        },                    
        attributes:[['id','value'],['username','label']],
      })
        .then((usuarios) =>
          resolve(usuarios)
        )
        .catch((reason) => reject(reason));
    });
} 

module.exports = {
    loginUsuario,
    listarUsuarios,
    mostrarUsuario,
    actualizarUsuario,
    createUsuario,
    itemsUsuarios
}
