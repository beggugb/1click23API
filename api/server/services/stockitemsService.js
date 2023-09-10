import db from '../../src/models';
import { Op as _Op, fn, col } from 'sequelize';


const { Marca } = db;

const itemsMarcas = () =>{
    return new Promise((resolve,reject)=>{
       Marca.findAll({
        raw:true,
        nest:true,
        order: [['nombre','asc']],
        attributes:[['nombre','label'],['id','value']],
        where: { enabled:  true },
       })
       .then((rows)=>{ resolve(rows)}) 
       .catch((reason)=> reject({message: reason.message}))
    })
}


module.exports = {        
    itemsMarcas,  
    registrarMarca,
    _deleteMarca,
    actualizarMarca, 
    dataMarcas,
    mostrarMarca  
}
